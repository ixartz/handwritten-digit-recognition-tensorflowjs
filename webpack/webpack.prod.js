const AsyncStylesheetWebpackPlugin = require('async-stylesheet-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const Common = require('./webpack.common.js');
const Utils = require('./utils');

module.exports = merge.smartStrategy({
  'module.rules.use': 'prepend',
})(Common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'assets/[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: /src/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              forceEnv: 'production',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([{ from: Utils.PUBLIC_DIR, to: Utils.DIST_DIR }]),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      ...Utils.generateHtmlWebpackPluginConfig(),
      inlineSource: 'runtime.+\\.js',
    }),
    new InlineSourcePlugin(),
    new AsyncStylesheetWebpackPlugin({
      preloadPolyfill: true,
    }),
    new WebpackCdnPlugin({
      modules: [
        { name: 'react', var: 'React', path: 'umd/react.production.min.js' },
        { name: 'react-dom', var: 'ReactDOM', path: 'umd/react-dom.production.min.js' },
        { name: 'styled-components', var: 'styled', path: 'dist/styled-components.min.js' },
        { name: 'redux', var: 'Redux', path: 'dist/redux.min.js' },
        { name: 'react-redux', var: 'ReactRedux', path: 'dist/react-redux.min.js' },
        { name: 'redux-saga', var: 'ReduxSaga', path: 'dist/redux-saga.min.js' },
        { name: '@tensorflow/tfjs', var: 'tf', path: 'dist/tf.min.js' },
        { name: 'bizcharts', var: 'BizCharts', path: 'umd/BizCharts.min.js' },
      ],
      prod: true,
    }),
  ],
  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  performance: {
    maxEntrypointSize: 350000,
  },
});
