const fs = require('fs');
const { join } = require('path');
const express = require('express');
const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const { match, RouterContext } = require('react-router');
const { isFunction, forEach } = require('lodash');

const routes = require('../share/routes.js').default;
const createStore = require('../share/store.js').default;
const Root = require('../share/Root.js').default;

function interpolateHtml(html, state, element) {
  return html
    .replace('${initState}', JSON.stringify(state))
    .replace('${app}', renderToString(element));
}

function getPreLoads(components) {
  return components
    .reduce((accumulator, c) => {

      if (isFunction(c)) {
        return isFunction(c.preLoad) ?
          accumulator.concat(c.preLoad) :
          accumulator;
      }

      forEach(c, v => {
        if (isFunction(v.preLoad)) { accumulator.push(v.preLoad); }
      });

      return accumulator;
    }, []);
}

function loadInitData(components, params) {
  return Promise.all(
    getPreLoads(components)
      .map(preLoad => Promise.resolve(preLoad(params)))
  );
}

function sendHtml(html, req, res, next) {
  match({ routes , location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      next(err);
    }

    else if(redirectLocation) {
      const {
        pathname,
        search
      } = redirectLocation;
      res.redirect(302, pathname + search);
    }

    else if(renderProps){
      const {
        components,
        params
      } = renderProps;
      const store = createStore({});

      loadInitData(components, { store , params })
        .then(() => {
          const router = createElement(RouterContext, renderProps);
          const root = createElement(Root, { store, children: router });
          res.send(interpolateHtml(html, store.getState().toJS(), root));
        })
        .catch(next);
    }

    else {
      res.redirect(404, '/404');
    }
  });
}

function setupProdMiddleware(app, config) {
  const {
    outputPath,
    publicPath
  } = config;
  const html = fs.readFileSync(join(outputPath, 'index.html')).toString();

  app.use(publicPath, express.static(outputPath));
  app.get('*', (req, res, next) => sendHtml(html, req, res, next));
}

function setupDevMiddleware(app, config) {
  const compiler = require('webpack')(config);
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    silent: true,
    stats: 'errors-only'
  });

  app.use(devMiddleware);
  app.use(require('webpack-hot-middleware')(compiler));

  app.get('*', (req, res, next) => {
    devMiddleware.fileSystem.readFile(join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        sendHtml(file.toString(), req, res, next);
      }
    });
  });
}

module.exports = function(app, prodConfig) {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    const options = Object.assign({}, require('../webpack/defaults.js'), prodConfig);
    setupProdMiddleware(app, options);
  }
  else {
    setupDevMiddleware(app, require('../webpack/dev.js'));
  }

  return app;
}
