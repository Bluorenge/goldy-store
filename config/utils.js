const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = {
    getHbsPages: function () {
        const pages = fs
            .readdirSync('./src/views/pages')
            .filter(fileName => fileName.endsWith('.hbs'));

        return pages.map(page => {
            return new HTMLWebpackPlugin({
                filename: page.replace('hbs', 'html'),
                template: `${paths.src}\/views\/pages\/${page}`,
                meta: {
                    charset: {
                        charset: 'utf-8',
                    },
                    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                },
                // chunks: ['main'],
            });
        });
    },

    // Если нужна обработка какого-то плагина
    // modules: String[]
    excludeNodeModulesExcept: function (modules) {
        var pathSep = path.sep;
        if (pathSep === '\\') {
            pathSep = '\\\\';
        }
        var moduleRegExps = modules.map(modName => {
            return new RegExp('node_modules' + pathSep + modName);
        });

        return function (modulePath) {
            if (/node_modules/.test(modulePath)) {
                for (var i = 0; i < moduleRegExps.length; i++) {
                    if (moduleRegExps[i].test(modulePath)) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        };
    },
};
