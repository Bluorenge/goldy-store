const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');
const paths = require('./paths');

module.exports = merge(common, {
    mode: 'production',

    devtool: false,

    output: {
        path: paths.build,
        filename: 'js/[name].[contenthash].bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.(css|s[ac]ss)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: '../' },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
        }),
    ],
});
