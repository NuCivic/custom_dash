const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs = require('fs-extra');
const chokidar = require('chokidar');
const colors = require('colors');
const { exec } = require('child_process');

const nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

if(process.env.REACT_DASH_PATH && process.env.DKAN_DASH_PATH) {
  const originRD = path.resolve(process.env.REACT_DASH_PATH);
  const destinationRD = path.join(__dirname, 'node_modules', 'react-dash');
  const originRDSrc = path.join(originRD, 'src');
  const originDDSrc = path.join(process.env.DKAN_DASH_PATH, 'js', 'src');
  const originRDDistFiles = path.join(originRD, 'dist');
  const destinationRDDistFiles = path.join(destinationRD, 'dist');

  const buildAll = (filename) => {
    console.log('---- BUILDING REACT DASH -----'.cyan);
    exec('npm run build', {cwd: process.env.REACT_DASH_PATH }, (error, stdout, stderr) => {
      if(error || stderr) throw new Error(error || stderr);
      console.log(stdout);
      fs.copySync(originRDDistFiles, destinationRDDistFiles);
      buildDkanDash(filename);
      console.log('------ REACT DASH BUILT ------'.green);
    });
  };

  const buildDkanDash = (filename) => {
    console.log('----- BUILDING DKAN DASH -----'.cyan);
    exec('npm run build-dev', {cwd: path.join(process.env.DKAN_DASH_PATH, 'js') }, (error, stdout, stderr) => {
      console.log(stdout);
      console.log('------ DKAN DASH BUILT -------'.green);
    });
  };

  // Watch react-dash
  const watcherRD = chokidar.watch(originRDSrc, {
    persistent: true,
    ignoreInitial: true
  });

  watcherRD
    .on('change', buildAll)
    .on('add', buildAll)
    .on('unlink', buildAll);

  // Watch dkan_dash
  const watcherDD = chokidar.watch(originDDSrc, {
    persistent: true,
    ignoreInitial: true
  });

  watcherDD
    .on('change', buildDkanDash)
    .on('add', buildDkanDash)
    .on('unlink', buildDkanDash);
}

module.exports = {
  entry: [
    './js/src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'customDash.js',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      output: { comments: false },
      mangle: true
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: ['customDash.js'],
        include: [
          path.join(__dirname, 'js'),
        ]
      }
    ]
  },
  externals: nodeModules,
};
