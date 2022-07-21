
  
//@ts-check

'use strict';

const path = require('path');

/**@type {import('webpack').Configuration}*/
const config = {
  target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/

  entry: './build/ext-src/extension.js', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'build/ext-src'),
    filename: 'serverPack.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'ts-loader',
      //       options:
      //       {
      //         configFile:"tsconfig.json"
      //       }
      //     }
      //   ]
      }
    ]
  },
  optimization: {
    minimize: false
 },
};
module.exports = config;