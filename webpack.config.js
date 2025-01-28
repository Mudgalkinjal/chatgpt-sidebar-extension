const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production', 
  target: 'webworker', 
  entry: {
    background: './background.js', 
    contentScript: './contentScript.js' 
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', 
    clean: true 
  },
  plugins: [
    new Dotenv({
      systemvars: true, 
      path: path.resolve(__dirname, '.env') 
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'manifest.json', to: '.' },
        { from: 'sidebar.html', to: '.' },
        { from: 'sidebar.css', to: '.' },
        { from: 'sidebar.js', to: '.' }
      ]
    })
  ],
  devtool: 'source-map', 
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  }
};
