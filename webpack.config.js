require('dotenv').config();
var Webpack = require('webpack');
// var StatsPlugin = require('stats-webpack-plugin');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var autoprefixer = require('autoprefixer-core');
// var csswring = require('csswring');
var path = require('path');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var assetsPath = path.resolve(__dirname, 'public', 'assets');
var entryPath = path.resolve(__dirname, 'app', 'app.start.js');
var host = process.env.APP_HOST || 'localhost';
var proxyPort = (process.env.APP_PORT) ? process.env.APP_PORT + 1 : 3001;

const TARGET = process.env.npm_lifecycle_event;
console.log("target event is " + TARGET);

var config = {

    // Makes sure errors in console map to the correct file
    // and line number
    devtool: 'eval',
    entry: {
        'app': [

            // For hot style updates
            'webpack/hot/dev-server',

            // The script refreshing the browser on none hot updates
            'webpack-dev-server/client?http://' + host + ':' + proxyPort,

            // Our application
            entryPath,
        ]
    },
    // console settings
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    },
    // output locations and filenames
    output: {
        path: assetsPath,
        filename: '[name].js'
    },


    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2']
                }
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.css$/,
                loaders: ["style", "css"]
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },

    plugins: [
        // We have to manually add the Hot Replacement plugin when running
        // from Node
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.DefinePlugin({
            'process.env': {
                'CG_URL': JSON.stringify(process.env.CG_URL),
                'CG_CLIENT_ID': JSON.stringify(process.env.CG_CLIENT_ID),
                'CG_CLIENT_SECRET': JSON.stringify(process.env.CG_CLIENT_SECRET),
                'APP_URL': JSON.stringify(process.env.APP_URL),
                'APP_PORT': JSON.stringify(process.env.APP_PORT),
                'APP_HOST': JSON.stringify(process.env.APP_HOST),
                'DEFAULT_LOCALE': JSON.stringify(process.env.DEFAULT_LOCALE)
            }
        })
    ]
};

module.exports = config;
