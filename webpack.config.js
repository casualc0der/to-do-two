const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',  
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', MiniCssExtractPlugin.loader,
          'css-loader', 
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
};