/**
 * @file webpack development configure
 * @author leon <ludafa@outlook.com>
 */

/* eslint-disable fecs-no-require */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const port = process.env.PORT || 9000;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${port}`,
            'webpack/hot/only-dev-server',
            path.join(__dirname, '../src/index.js')
        ]
    },
    devtool: 'inline-source-map',
    output: {
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['css-hot-loader'].concat(
                    ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]_[local]_[hash:base64:5]'
                            }
                        }
                    })
                )
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, '../dll'),
            manifest: require('../dll/vendor.json')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            ignoreOrder: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'index.html',
            title: 'index',
            template: path.join(__dirname, 'template.js')
        })
    ],
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        compress: true,
        historyApiFallback: true,
        port,
        hot: true,
        inline: true
    }
};
