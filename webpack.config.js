const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: { extensions: ['.jsx', '.js'] },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(s[ac]ss|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|woff)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'assets/images',
              outputPath: 'assets/images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin(
      {
        inject: true,
        template: './public/index.html',
        filename: 'index.html',
      }
    ),
    new MiniCSSExtractPlugin({
      filename: './styles/[name].css',
      chunkFilename: './styles/[id].css'
    }),
    new LinkTypePlugin({
      '*.css': 'text/css',
    })
  ],
}