const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Utils = require('./utils');

const config = {
  entry: path.resolve(Utils.ROOT_DIR, 'src/main.jsx'),
  output: {
    path: Utils.DIST_DIR,
    filename: 'scripts/[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: /src/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
              emitWarning: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: /src/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          // Environment config will prepend loader here
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([Utils.DIST_DIR], { root: Utils.ROOT_DIR }),
    new HtmlWebpackPlugin({
      ...Utils.generateHtmlWebpackPluginConfig(),
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = config;
