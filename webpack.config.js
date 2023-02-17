'use strict';
const htmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackConfig = new htmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: __dirname + 'src/entry.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [ 'es2015', 'react' ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [ htmlWebpackConfig ],
  devServer: {
    inline: true,
    port: 8080,
    historyApiFallback: {
      index: '/'
    }
  }
};