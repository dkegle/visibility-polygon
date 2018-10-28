const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const IgnoreAssetsWebpackPlugin = require('ignore-assets-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {}}
            ]
      },
      {
          test: /\.scss$/,
          use: ["style-loader",
                'css-loader',
                "sass-loader"
          ]
      }
    ]
   },
   plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inlineSource: '.(js)$'
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new IgnoreAssetsWebpackPlugin({
            ignore: 'index.js'
        })
   ],
   devServer: {
    before(app) {
      // use proper mime-type for wasm files
      app.get('*.wasm', function(req, res, next) {
          var options = {
              root: path.resolve(__dirname, ''),
              dotfiles: 'deny',
              headers: {
                  'Content-Type': 'application/wasm'
              }
          };
          res.sendFile(req.url, options, function (err) {
              if (err) {
                  next(err);
              }
          });
      });
    }
  }
};
