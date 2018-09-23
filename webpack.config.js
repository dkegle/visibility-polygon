const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader"
          ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: ''
            }
        }]
      }
    ]
   },
   plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  mode: 'development'
};
