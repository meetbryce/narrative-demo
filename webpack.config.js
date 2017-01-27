/* eslint-env node */
/* eslint no-console: 0 */

const webpack = require('webpack');

module.exports = {
    entry: './src/client/app/index.js',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: './build/bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            firebase: 'firebase',
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: 'cheap-module-eval-source-map'
        // })
    ],
};
