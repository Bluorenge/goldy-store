const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
    plugins: [
        // TODO: удаляет dropdown
        // purgecss({
        //     content: ['./src/views/**/*.hbs'],
        // }),
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default',
        }),
    ],
};
