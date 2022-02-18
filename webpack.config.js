const path = require('path');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [{
      test:  /\.js/ ,
      use: ['babel-loader'],
      exclude: /node_modules/
    }]
  }
}