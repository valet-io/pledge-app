'use strict';

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var connect     = require('connect');
var http        = require('http');

var env = function () {
  var environments = Array.prototype.slice.call(arguments, 0);
  return !!environments.filter(function (e) {
    return plugins.util.env[e];
  });
};


gulp.task('lint', function () {
  return gulp.src(['app/src/**/*.js', 'test/**/*.js', 'gulpfile.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(plugins.clean());
});

gulp.task('templates', function () {
  return gulp.src('app/src/**/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('styles', function () {
  return gulp.src('app/styles/**/*.styl')
    .pipe(plugins.stylus({
      use: [require('nib')()],
      include: ['./components/bootstrap-stylus/stylus'],
      compress: env('production', 'staging')
    }))
    .pipe(gulp.dest('build/styles'));
});

gulp.task('vendor', function () {
  return gulp.src([
    './components/angular/angular.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js',
    './components/stripe/index.js',
    './components/raven-js/dist/raven.js',
    './components/raven-js/plugins/angular.js'
  ])
  .pipe(plugins.concat('vendor.js'))
  .pipe(plugins.if(env('production', 'staging'), plugins.uglify()))
  .pipe(gulp.dest('build'));
});

gulp.task('browserify', function () {
  return browserify('./app/src/app/index.js')
    .transform('envify')
    .transform('browserify-shim')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('index', function () {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['clean'], function (done) {
  runSequence(['browserify', 'templates', 'index', 'styles', 'images'], done);
});

gulp.task('serve', function (done) {
  var server = http.createServer(connect()
    .use(connect.logger('dev'))
    .use(connect.static('build'))
  )
  .listen(8000, function () {
    plugins.util.log('Running on http://localhost:' + server.address().port);
    done();
  });
});

gulp.task('default', ['test', 'build']);
