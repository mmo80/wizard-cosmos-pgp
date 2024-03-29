const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const output = {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
}

const plugins = [
    new MiniCssExtractPlugin({
        filename: '[name].bundle.css'
    }),
]

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins,
    output,
});