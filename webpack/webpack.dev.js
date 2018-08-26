const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const merge = require('webpack-merge');
const path = require('path');
const Common = require('./webpack.common.js');
const Utils = require('./utils');

module.exports = merge.smartStrategy({
  'module.rules.use': 'prepend',
})(Common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: [Utils.PUBLIC_DIR, path.resolve(Utils.ROOT_DIR, 'node_modules')],
    overlay: {
      warnings: false,
      errors: true,
    },
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackCdnPlugin({
      modules: [
        { name: 'react', var: 'React', path: 'umd/react.development.js' },
        { name: 'react-dom', var: 'ReactDOM', path: 'umd/react-dom.development.js' },
        { name: 'react-redux', var: 'ReactRedux', path: 'dist/react-redux.js' },
        { name: 'redux-saga', var: 'ReduxSaga', path: 'dist/redux-saga.js' },
        { name: '@tensorflow/tfjs', var: 'tf', path: 'dist/tf.js' },
        { name: 'bizcharts', var: 'BizCharts', path: 'umd/BizCharts.js' },
      ],
      prod: false,
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ],
});
