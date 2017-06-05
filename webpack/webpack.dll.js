/**
 * @file webpack dll configure
 * @author leon <ludafa@outlook.com>
 */

const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');
const root = path.join(__dirname, '../dll');

module.exports = {
    target: 'electron-renderer',
    entry: {
        vendor: Object.keys(pkg.dependencies)
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                }
            }
        ]
    },
    output: {
        path: root,
        filename: '[name].dll.js',
        library: '[name]',
        libraryTarget: 'var'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(root, '[name].json'),
            name: '[name]',
            context: root
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};
