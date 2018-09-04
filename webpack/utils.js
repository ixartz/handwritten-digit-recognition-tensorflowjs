const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

function generateHtmlWebpackPluginConfig() {
  return {
    title: 'Live digit recognition on phone and desktop',
    template: path.resolve(ROOT_DIR, 'templates/index.html'),
  };
}

module.exports = {
  ROOT_DIR,
  PUBLIC_DIR,
  DIST_DIR,
  generateHtmlWebpackPluginConfig,
};
