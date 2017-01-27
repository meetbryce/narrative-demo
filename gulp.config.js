/* eslint-env node */
/* eslint no-console: 0 */

module.exports = function () {
    var build = './build/';
    var client = './src/client/';
    var clientApp = client + 'app/';
    var server = './src/server/';
    var root = './';
    var config = {
        /**
         * File paths
         */
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        build: build,
        buildImages: build + 'images/',
        client: client,
        html: client + '**/*.html',
        images: client + 'images/**/*.*',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        jsOrder: [
            '**/app.module.js',
            '**/*.module.js',
            '**/*.js'
        ],
        sass: client + 'styles/styles.scss',
        root: root,
        server: server,
        source: 'src/',
        styles: client + 'styles/**/*.scss',
        templates: clientApp + '**/*.html',
    };

    return config;
};
