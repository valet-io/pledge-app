'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var files = {
  gulp: ['gulpfile.js'],
  src: ['app/src/**/*.js', '!app/bower_components/**'],
  test: ['test/**/*.js'],
  dist: ['dist']
};

gulp.task('lint', function () {
  return gulp.src(files.gulp.concat(files.src, files.test))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('clean', function () {
  return gulp.src(files.dist, {read: false})
    .pipe(plugins.clean());
});

gulp.task('test', []);
gulp.task('build', ['clean']);

gulp.task('default', ['test', 'build']);