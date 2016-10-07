var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    module: {
        loaders: [
        {
            test: /\.jsx?/,
            include: APP_DIR,
            loader: 'babel',
            exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]
        }
        ]
    },
    entry: APP_DIR + '/javascript/bootstrap.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'js/bundle.js'
    }
};

module.exports = config;
