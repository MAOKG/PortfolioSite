const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
    // publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: '$'
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader', 'postcss-loader']
        })
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
              // publicPath: 'img/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    extractPlugin,
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['dist'])
  ]
};
