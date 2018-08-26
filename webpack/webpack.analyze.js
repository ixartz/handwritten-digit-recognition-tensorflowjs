const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const Prod = require('./webpack.prod.js');

module.exports = merge.smartStrategy({
  'module.rules.use': 'prepend',
})(Prod, {
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
    }),
  ],
});
