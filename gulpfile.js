'use strict';

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var superstatic = require('superstatic');

var isEnv = function () {
  var environments = Array.prototype.slice.call(arguments, 0);
  return !!environments
    .filter(function (e) {
      return plugins.util.env[e];
    })
    .length;
};

var env = Object.keys(plugins.util.env)
  .filter(function (flag) {
    return ['development', 'staging', 'production'].indexOf(flag) !== -1;
  })[0];

gulp.task('lint', function () {
  return gulp.src(['./src/**/*.js', './test/**/*.js', './gulpfile.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(plugins.rimraf());
});

gulp.task('templates', function () {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('styles', function () {
  return gulp.src('./styles/**/*.styl')
    .pipe(plugins.stylus({
      use: [require('nib')()],
      include: ['./components/bootstrap-stylus/stylus'],
      compress: isEnv('production', 'staging')
    }))
    .pipe(gulp.dest('./build/styles'));
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
  .pipe(plugins.if(isEnv('production', 'staging'), plugins.uglify()))
  .pipe(gulp.dest('./build/scripts'));
});

gulp.task('browserify', function () {
  var bundler = browserify('./src/app/index.js')
    .transform(require('envify/custom')({
      NODE_ENV: env
    }))
    .transform('browserify-shim');

  if (isEnv('production', 'staging')) { 
    bundler.transform('uglifyify');
  }

  return bundler
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(plugins.if(
      isEnv('production', 'staging'),
      plugins.streamify(plugins.uglify())
    ))
    .pipe(gulp.dest('./build/scripts'));
});

gulp.task('index', function () {
  return gulp.src('./index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['clean'], function (done) {
  runSequence(['browserify', 'vendor', 'templates', 'index', 'styles'], done);
});

gulp.task('server', function (done) {
  superstatic()
    .listen(8000, function () {
      plugins.util.log('Running on http://localhost:8000');
      done();
    });
});
