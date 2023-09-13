const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.
//code exports a function that returns a webpack configuration object
module.exports = () => {
  return {
    //sets the mode to develpment indicating that this webpack configuration is intended for develpment purposes. 
    mode: 'development',
    //specifiying the entry points "main" and "install"
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    //configures the output settings for the bundled files. It specifies that the files will be replaced with the entry point name
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    //inserts plugins to be used to generate html files
    plugins: [
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E'
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        background_color: "#28ffe5",
        theme_color: "#ddb1ff",
        name: "JATE",
        short_name: "JATE",
        description: "",
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Replace with your icon path
            destination: path.join('assets', 'icons'),
            sizes: [16, 32, 96, 144],
          },
        ],
      }),
    ],
// This specifies the rules for how the different types of files should be handled by webpack
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
