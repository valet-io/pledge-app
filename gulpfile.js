'use strict';

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var plugins     = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var karma       = require('karma-as-promised');

var production = (process.env.NODE_ENV === 'production' || process.env.CI);

gutil.log(gutil.colors.cyan('Running in ' + (production ? 'production' : 'development') + ' mode'));

gulp.task('lint', function () {
  return gulp.src(['app/src/**/*.js', 'test/**/*.js', 'gulpfile.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('unit', function () {
  return karma.server.start({
    frameworks: ['mocha', 'chai-sinon', 'browserify'],
    files: ['test/unit/**/*.js'],
    preprocessors: {'test/unit/**/*.js': ['browserify']},
    browserify: {
      debug: true,
      watch: !production
    },
    port: 8080,
    browsers: ['PhantomJS'],
    autoWatch: !production,
    singleRun: production,
    browserNoActivityTimeout: 20000
  });
});

gulp.task('e2e', function () {

});

gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(plugins.clean());
});

gulp.task('test', function (done) {
  runSequence('unit', 'e2e', done);
});

gulp.task('build', ['clean']);

gulp.task('default', ['test', 'build']);