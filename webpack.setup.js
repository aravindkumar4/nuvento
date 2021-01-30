const webpack = require('webpack');
const path = require("path");
const dotenv = require('dotenv');
const webPackConfig = require('./webpack.config');

dotenv.config();
const HtmlWebpackPlugin = require("html-webpack-plugin")

function buildConfig(env) {
    if (env !== "production") {
        webPackConfig.devtool = 'inline-source-map';
        webPackConfig.devServer = {
            contentBase: path.join(__dirname, 'public')
        };
    }
    webPackConfig.mode = env;
    return webPackConfig; 
}

module.exports = buildConfig
