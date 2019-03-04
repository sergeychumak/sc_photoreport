'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
// const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = require('../config/dev.env')

var configDefault = {
  watch: true,
  module: {
    rules: utils.styleLoaders({
      extract: true,
      usePostCSS: true
    })
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js'
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': env}),
    new ExtractTextPlugin({filename: 'css/[name].css', allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        // to: config.dev.assetsSubDirectory,
        to: path.resolve(__dirname, './../../target/fosm3/resources/new-dev/static'),
        ignore: ['.*']
      }
    ])
  ]
};

const webpackConfig2Target = merge(baseWebpackConfig, configDefault, {
  output: {
    path: path.resolve(__dirname, './../../target/fosm3/resources/new-dev')
  }
})

module.exports = webpackConfig2Target
