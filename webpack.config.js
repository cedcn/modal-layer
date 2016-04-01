const path = require('path');
const OUTPATH = path.join(__dirname, './example')

const config = {
  context: __dirname,
  entry: {
    // app: './src/jquery-modal-layer.js',
    example: './example/app.js'
  },
  output: {
    path: OUTPATH,
    filename: '[name].min.js',
    publicPath: "/assets/"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.scss|\.css$/, loader: 'style!css?minimize!autoprefixer!sass' }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
  }
}

module.exports = config;
