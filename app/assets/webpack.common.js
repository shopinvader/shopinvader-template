const path = require('path');
const Webpack = require('webpack');
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    './app/assets/javascripts/app.js',
    './public/javascripts/shopinvader.jquery.js',
    './public/javascripts/application.js',
  ],
  output: {
    path:     path.resolve(__dirname, '../../public'),
    filename: 'javascripts/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              importer: globImporter()
            }
          }
        }]
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]&useRelativePath=false&publicPath=../'
      },
      {
        test: /\.(ttf|eot|otf)$/,
        loader: 'file-loader?name=fonts/[name].[ext]&useRelativePath=false&publicPath=../'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader', options: {
              outputPath: 'images/',
              name: '[path][name].[ext]'
            }
          },
          { loader: 'image-webpack-loader', options: { bypassOnDebug: true } }
        ]
      }
    ]
  },
  plugins: [
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new MiniCssExtractPlugin({ filename: 'stylesheets/bundle.css', allChunks: true })
  ]
};
