const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');

module.exports = require('./base')({
  entry: {
    app: path.join(process.cwd(), 'client/clientRender.js'),
    vendor: [
      'react',
      'react-dom',
      'react-router'
    ],
  },

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  cssLoaders: ExtractTextPlugin.extract(
    'style',
    'css?modules&-autoprefixer&importLoaders=1',
    'postcss'
  ),

  postcssPlugins: [
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),

    // OccurrenceOrderPlugin is needed for long-term caching to work properly.
    new webpack.optimize.OccurrenceOrderPlugin(true),

    // Merge all duplicate modules
    new webpack.optimize.DedupePlugin(),

    // Minify and optimize the JavaScript
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      }
    }),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'server/index.html',
      inject: true,
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),

    // Extract the CSS into a seperate file
    new ExtractTextPlugin('[name].[contenthash].css')
  ]
});
