const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'sourcemap',
  entry: {
    main: './js/main'
  },
  output: {
    filename: './public/js/[name].js'
  },
  context: path.join(__dirname, './src/'),
  resolve: {
    alias: {
      resources: path.join(__dirname, './client/app/resources')
    }
  },
  plugins: [
    new ExtractTextPlugin('public/css/style.css')
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/app\/lib/, /node_modules/],
        use: [
          {
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer'),
                  require('cssnano')
                ];
              }
            }
          }, {
            loader: 'sass-loader'
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'url-loader?limit=1000&name=/[path][name].[ext]'
        }]
      },
      {
        test: /\.png$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'url-loader?limit=10000&name=/[path][name].[ext]'
        }]
      }
    ]
  }
};