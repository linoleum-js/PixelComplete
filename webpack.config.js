var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    script: './app.jsx',
    style: './index.less'
  },

  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].bundle.js'
  },

  module: {
    loaders: [{
      test: /\.jsx/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      },
      exclude: /(node_modules)/
    }, {
      test: /\.json$/,
      loader: 'json',
      exclude: /(node_modules)/
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      exclude: /(node_modules)/
    }]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery'
    }),
    new webpack.ProvidePlugin({
      toastr: 'toastr'
    }),
    new ExtractTextPlugin('[name].css')
  ],

  watch: true,
  devtool: 'cheap-module-source-map'
};