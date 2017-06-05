/**
 * @file build dll
 * @author leon <ludafa@outlook.com>
 */

/* eslint-disable fecs-no-require, no-console */

const path = require('path');
const fs = require('fs');

if (
    fs.existsSync(path.join(__dirname, '../dll/vendor.dll.js'))
    && fs.existsSync(path.join(__dirname, '../dll/vendor.json'))
) {
    console.log('bundle done[using cache]');
    return;
}

const webpack = require('webpack');
const config = require('./webpack.dll.js');

webpack(config, (error, stats) => {

    if (error || stats.hasErrors()) {
        console.log(error || stats.toString());
        process.exit(1);
    }

    console.log('bundle done');
    return 0;

});
