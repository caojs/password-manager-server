const path = require('path');
const express = require('express');
const fs = require('fs');
const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const { match, RouterContext } = require('react-router');
const routes = require('../share/routes.js').default;
const createRootElement = require('../share/createRootElement').default;

function interpolateHtml(html, state, element) {
  return html
    .replace('${initState}', JSON.stringify(state))
    .replace('${app}', renderToString(element));
}

function sendHtml(html, req, res) {
  match({ routes , location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    }
    else if(redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }
    else if(renderProps){
      // TODO: load data using renderProps.routes.components
      const router = createElement(RouterContext, renderProps);
      const root = createRootElement({}, router);
      res.send(interpolateHtml(html, {}, root));
    }
    else {
      res.status(404).send('Not found!');
    }
  });
}

function setupProdMiddleware(app, config = {}) {
  const defaults = require('../webpack/defaults');
  const outputPath = config.outputPath || defaults.outputPath;
  const publicPath = config.publicPath || defaults.publicPath;
  const html = fs.readFileSync(path.resolve(outputPath, 'index.html')).toString();

  app.use(publicPath, express.static(outputPath));
  app.get('*', (req, res) => sendHtml(html, req, res));
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

  app.get('*', (req, res) => {
    devMiddleware.fileSystem.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        sendHtml(file.toString(), req, res);
      }
    });
  });
}

module.exports = function(app, prodConfig) {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    setupProdMiddleware(app, prodConfig);
  }
  else {
    setupDevMiddleware(app, require('../webpack/dev.js'));
  }

  return app;
}
