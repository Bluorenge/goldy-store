const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const paths = require('./paths');

module.exports = merge(common, {
    mode: 'development',

    output: {
        path: paths.dist,
        filename: 'js/bundle.js',
    },

    devtool: 'source-map',
    // devtool: 'inline-source-map',

    devServer: {
        historyApiFallback: {
            index: '/index.html',
        },
        static: paths.dist,
        // open: true,
        compress: true,
        host: '127.0.0.1',
        hot: false,
        port: 3003,
        // devMiddleware: {
        //     writeToDisk: true,
        // },
    },
    
    module: {
        rules: [
            {
                test: /\.(css|s[ac]ss)$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
});
