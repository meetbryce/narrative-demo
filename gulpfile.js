let browserSync = require('browser-sync');
const config = require('./gulp.config.js')();
const del = require('del');
const exec = require('child_process').exec;
const gulp = require('gulp');
const pngquant = require('imagemin-pngquant');
const $ = require('gulp-load-plugins')({ lazy: true });

const errorHandlerFactory = function (taskName) {
    return function (err) {
        $.notify.onError({
            title: "Gulp Error: " + taskName,
            message: "<%= error.message %>",
            sound: "Beep"
        })(err);

        //noinspection JSUnresolvedFunction
        this.emit('end');
    };
};

// Combines vendor CSS files since SCSS can't import CSS
gulp.task('bundle', function () {
    return gulp.src(config.index)
        .pipe($.plumber({ errorHandler: errorHandlerFactory('bundle') }))
        .pipe($.useref())
        .pipe(gulp.dest(config.build));
});

// Deletes all files in the build directory
gulp.task('clean', function () {
    return del([
        config.build + '/**/*'
    ], { force: true })
});

// Copies and compresses image files to build folder (only runs on changed files)
gulp.task('images', function () {
    return gulp.src(config.images)
        .pipe($.plumber({ errorHandler: errorHandlerFactory('images') }))
        .pipe($.newer(config.build + '/images'))
        .pipe($.imagemin({
            optimizationLevel: 7,
            multipass: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.build + '/images'));
});

// Copies all HTML files from within the app folder
// which should be the html templates for directives & components
gulp.task('moveDirectives', function () {
    return gulp.src(config.templates)
        .pipe($.plumber({ errorHandler: errorHandlerFactory('moveDirectives') }))
        .pipe(gulp.dest(config.build + '/app'))
});

// Processes SCSS files, autoprefixes, minifies, and creates sourcemaps
gulp.task('styles', function () {
    gulp.src(config.sass)
        .pipe($.plumber({ errorHandler: errorHandlerFactory('styles') }))
        .pipe($.sourcemaps.init())
        .pipe($.sass({ outputStyle: 'compressed' }).on('error', $.sass.logError))
        .pipe($.autoprefixer())
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.build))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

// Runs the default webpack process which builds the JS file bundle.js
gulp.task('webpack', function (cb) {
    exec('npm run build', function (err) {
        cb(err);
    });
});

// Used to call Webpack then when that's finished, reload browserSync pages
gulp.task('script-reload', ['webpack'], browserSync.reload);

// Used to call moveDirectives then when that's finished, reload browserSync pages
gulp.task('html-reload', ['moveDirectives'], browserSync.reload);

// Sets up watches and triggers the appropriate Gulp task for those files
gulp.task('watch', ['serve'], function () {
    gulp.watch(config.index, ['bundle']);
    gulp.watch(config.html, ['html-reload']);
    gulp.watch(config.styles, ['styles']);
    gulp.watch(config.js, ['script-reload']);
    gulp.watch(config.images, ['images']);
});

// Serves the Build folder with a simple server && browserSync
// Does this AFTER successfully finishing the Build task
gulp.task('serve', ['build'], function () {
    browserSync.init({
        server: {
            baseDir: config.build
        }
    })
});

// Builds the project by running each of the tasks listed simultaneously
gulp.task('build', ['webpack', 'bundle', 'moveDirectives', 'styles', 'images'], function () {});

// Runs the Watch task
// which in turn starts the browserSync server (using Serve)
// which in turn Builds the assets
gulp.task('default', ['watch']);
