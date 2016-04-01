const path = require('path');
const OUTPATH = path.join(__dirname, './dist')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  context: __dirname,
  entry: {
    'style': './src/style.js'
  },
  output: {
    path: OUTPATH,
    filename: '[name].min.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.scss|\.css$/, loader: ExtractTextPlugin.extract('css?minimize!autoprefixer!sass') }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
}

module.exports = config;
