var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var path = require('path');
var fs = require('fs');
var host = process.env.APP_HOST || 'localhost';
var proxyPort = (process.env.APP_PORT) ? process.env.APP_PORT + 1 : 3001;

module.exports = function () {

    // First we fire up Webpack an pass in the configuration we
    // created
    var bundleStart = null;
    var compiler = Webpack(webpackConfig);

    // We give notice in the terminal when it starts bundling and
    // set the time it started
    compiler.plugin('compile', function () {
        console.log('Bundling...');
        bundleStart = Date.now();
    });

    // We also give notice when it is done compiling, including the
    // time it took. Nice to have
    compiler.plugin('done', function () {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });

    var bundler = new WebpackDevServer(compiler, {

        // We need to tell Webpack to serve our bundled application
        // from the assets path. When proxying:
        // http://localhost:3000/assets -> http://localhost:8080/assets
        publicPath: '/assets/',

        // Configure hot replacement
        hot: true,

        // The rest is terminal configurations
        quiet: false,
        noInfo: false,
        stats: {
            colors: true
        }
    });

    // We fire up the development server and give notice in the terminal
    // that we are starting the initial bundle
    bundler.listen(proxyPort, host, function () {
        console.log('Bundling project, please wait...');
    });

};
