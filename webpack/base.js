const webpack = require('webpack');
const defaults = require('./defaults');

module.exports = (options) => ({
  entry: options.entry,

  output: Object.assign({
    path: defaults.outputPath,
    publicPath: defaults.publicPath,
  }, options.output),

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: options.babelQuery,
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: options.cssLoaders,
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style', 'css'],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file',
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'file',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
      ],
    }, {
      test: /\.html$/,
      loader: 'html',
    }, {
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url?limit=10000',
    }],
  },

  postcss: function() {
    return options.postcssPlugins;
  },

  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        IS_BROWSER: JSON.stringify(true)
      }
    })
  ]),

  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  stats: false, // Don't show stats in the console
  progress: true,
});
