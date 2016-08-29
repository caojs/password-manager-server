const fs = require('fs');
const { join } = require('path');
const express = require('express');
const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const { match, RouterContext } = require('react-router');
const { ReduxAsyncConnect, loadOnServer } = require('redux-connect');

const getRoutes = require('../share/routes').default;
const createStore = require('../share/store').default;
const Root = require('../share/Root').default;

function interpolateHtml(html, appHTML, state) {
  return html
    .replace('${initState}', JSON.stringify(state))
    .replace('${app}', appHTML);
}

function sendHtml(html, req, res, next) {
  const store = createStore({
    user: req.user,
    flash: req.flash()
  });
  const routes = getRoutes(store);

  match({
    routes,
    location: req.url
  }, (err, redirectLocation, renderProps) => {

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

      loadOnServer(Object.assign({ store }, renderProps))
        .then(() => {
          const appHTML = renderToString(
            createElement(Root, {
              store,
              children: createElement(ReduxAsyncConnect, renderProps)
            })
          );

          res.send(interpolateHtml(html, appHTML, store.getState().toJS()));
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
