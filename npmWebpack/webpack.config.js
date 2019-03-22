// Imports
const path = require('path');
const webpack = require('webpack');
// require("@babel/register");

// Webpack Configuration
const config = {

  // Entry
  entry:{
    searchkitSearch:'./src/searchkitSearch.js',
  },

  // Output
  output: {
    path: path.resolve(__dirname, '../public/javascripts'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};


// Exports
module.exports = config;
