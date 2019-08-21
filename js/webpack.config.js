// webpack.config.js

var webpack = require('webpack');
var path = require('path');

var libraryName = 'meshgrt';
var outputFile = libraryName + '.js';

var config = {
    entry: __dirname + '/src/mesh_gtfs_rt.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /(\\.jsx|\\.js)$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            },{
                test: /(\\.jsx|\\.js)$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: [path.resolve('./src'), path.resolve('./src/lib'), 'node_modules'],
        extensions: ['.js']
    }
};

module.exports = config;