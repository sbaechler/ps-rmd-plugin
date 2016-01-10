'use strict';
var path = require('path');

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: 'bundle.js'
  }
}
