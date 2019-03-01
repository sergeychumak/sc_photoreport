var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var paramsBuild = require('minimist')(process.argv.slice(2));
console.log(paramsBuild.TYPE);

var env = paramsBuild.TYPE === 'develop' ?  config.dev.env : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  watch: paramsBuild.TYPE === 'develop',
  entry: {
    app: './src/main.js'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: paramsBuild.TYPE === 'develop' ? '#source-map' : false,
  output: {
    // path: path.resolve(__dirname, '../dist'),
    path: path.resolve(__dirname, '../../src/main/webapp/resources/dist/'),
    filename: 'photoreport.v3.js'
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': env}),
    new ExtractTextPlugin({filename: 'photoreport.v3.css'})
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

if (paramsBuild.TYPE === 'prod'){
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, sourceMap: true}))
  webpackConfig.plugins.push(new OptimizeCSSPlugin({cssProcessorOptions: {safe: true}}))
}

// new CopyWebpackPlugin([
//   { from: 'dist', to: path.resolve(__dirname, '../../src/main/webapp/resources/dist/') }
// ], {})

module.exports = webpackConfig
