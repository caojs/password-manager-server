const path = require('path');
const express = require('express');

function setupProdMiddleware(app, config = {}) {
  const defaults = require('../../webpack/defaults');
  const outputPath = config.outputPath || defaults.outputPath;
  const publicPath = config.publicPath || defaults.publicPath;

  app.use(publicPath, express.static(outputPath));
  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
}

function setupDevMiddleware(app, config) {
  const compiler = require('webpack')(config);
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    silent: true,
    stats: 'errors-only'
  });
  const fs = devMiddleware.fileSystem;

  app.use(devMiddleware);
  app.use(require('webpack-hot-middleware')(compiler));

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
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
    setupDevMiddleware(app, require('../../webpack/dev.js'));
  }

  return app;
}
