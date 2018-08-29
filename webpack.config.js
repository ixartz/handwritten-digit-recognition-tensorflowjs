module.exports = (env) => {
  if (env.WEBPACK_CONFIG === 'dev') {
    return require('./webpack/webpack.dev.js');
  }
  if (env.WEBPACK_CONFIG === 'prod') {
    return require('./webpack/webpack.prod.js');
  }
  if (env.WEBPACK_CONFIG === 'analyze') {
    return require('./webpack/webpack.analyze.js');
  }
};
