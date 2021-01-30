const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack')

const dotenv = require('dotenv');
dotenv.config();

//Here we've setting the env variable values through webpack..
const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

const runtimeEnvKeys = Object.keys(env).reduce((prev, next) => {
    prev[`${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

const webPackConfig = {
    entry: {
        index: path.join(__dirname, 'src', 'index.js'),
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json', '.css']
    },
    node: {fs: 'empty'},
    externals: [
        {'./cptable': 'var cptable'},
        {'./jszip': 'jszip'}
     ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg|ico)$/,
                loader: ['file-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            favicon: path.join(__dirname, 'public', 'favicon.ico')
        }),
        new webpack.DefinePlugin(envKeys),
        new CleanWebpackPlugin(),
        new CreateFileWebpack({
            path: path.join(__dirname,`/public`),
            fileName: 'runtime-config.js',
            content: `window['runConfig']=${JSON.stringify(
                runtimeEnvKeys
            )};`,
          }),
    ]
}

module.exports = webPackConfig;