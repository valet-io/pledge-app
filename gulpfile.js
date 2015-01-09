'use strict';

var gulp     = require('gulp');
var gutil    = require('gulp-util');
var _        = require('lodash');
var tasks    = require('bd-gulp-tasks');
var karma    = require('karma-as-promised');
var sequence = require('run-sequence');

gutil.log('Environment:', gutil.colors.cyan(tasks.env.env));

tasks.use('lint', ['./src/**/*.js', './test/**/*.js', './gulpfile.js']);
tasks.use('clean', 'build');
tasks.use('templates', './src/**/views/*.html', 'build/views');
tasks.use('styles', './styles/main.scss', './build/styles');
tasks.use('vendor', [
  './vendor/modernizr.js',
  './node_modules/angular/angular.js',
  './node_modules/angular-messages/angular-messages.js',
  './node_modules/angular-ui-router/release/angular-ui-router.js',
  './components/stripe/index.js',
  './components/firebase/firebase.js',
  './components/raven-js/dist/raven.js',
  './components/raven-js/plugins/angular.js'
], './build/scripts');
tasks.use('bundle', './src/index.js', './build/scripts', {
  templates: './src/**/views/*.html',
  module: 'PledgeApp'
});
tasks.use('index', './src/index.html', './build');
tasks.use('server', void 0, void 0, {
  localEnv: {
    'stripe__key': 'pk_test_aPKl5Ap46UFNBny2hW0k6vDi',
    'stripe__test__key': 'pk_test_aPKl5Ap46UFNBny2hW0k6vDi',
    'firebase__endpoint': 'https://valet-io-events-dev.firebaseio.com',
    'valet__api': 'http://valet-io-pledge-dev.herokuapp.com'
  }
});
tasks.use('watch', {
  './src/**/views/*.html': 'templates',
  './src/index.html': 'index',
  './styles/**/*.scss': 'styles',
  './src/index.js': 'bundle'
}, void 0,
{
  build: './build',
  prerequisites: ['templates', 'styles', 'vendor', 'fonts', 'index']
});

gulp.task('unit', function () {
  var base = require('./karma');
  return karma.server.start(_.extend({}, base, gutil.env.sauce && require('./karma.sauce.js')))
    .then(function () {
      process.exit(0);
    })
    .catch(function () {
      process.exit(1);
    });
});

gulp.task('build', ['clean'], function (done) {
  sequence(['bundle', 'vendor', 'templates', 'styles', 'fonts', 'images'], 'index', done);
});

gulp.task('serve', ['watch', 'server']);

gulp.task('images', function () {
  return gulp.src('./images/**/*')
    .pipe(gulp.dest('./build/images'));
});

gulp.task('fonts', function () {
  return gulp.src('./fonts/*')
    .pipe(gulp.dest('./build/fonts'));
});


