const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = require('./paths');
const utils = require('./utils');

module.exports = {
    entry: paths.src + '/index.js',

    output: {
        publicPath: '',
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                options: {
                    precompileOptions: {
                        knownHelpersOnly: false,
                    },
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(gif|png|jpe?g|svg|webp|woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: content => {
                        return content.filename.replace('src/', '');
                    },
                },
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        ...utils.getHbsPages(),
    ],
};
