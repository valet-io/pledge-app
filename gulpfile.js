'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var browserify = require('browserify');

var karma = require('gulp-karma')({
  configFile: 'karma.conf.js'
});

gulp.task('lint', function () {
  return gulp.src(['app/src/**/*.js', 'gulpfile.js', 'test/**/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('clean', function () {
  return gulp.src(files.dist, {read: false})
    .pipe(plugins.clean());
});

gulp.task('unit', function (done) {
  return karma.once();
});

gulp.task('browserify', function () {
  return browserify('./app/src/app')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['clean']);

gulp.task('default', ['test', 'build']);