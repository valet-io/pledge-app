'use strict';

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var superstatic = require('superstatic');
var watchify    = require('watchify');
var internals   = {};

var env = plugins.util.env.env || 'development';
var isEnv = function () {
  return Array.prototype.slice.call(arguments, 0).indexOf(env) !== -1;
};

var paths = {
  src: './src/**/*.js',
  main: './src/index.js',
  index: './index.html',
  templates: './src/**/*.html',
  test: './test/**/*.js',
  styles: './styles/main.scss',
  build: './build'
};

plugins.util.log('Environment:', plugins.util.colors.cyan(env));

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
  return gulp.src('./styles/main.scss')
    .pipe(plugins.sass({
      includePaths: require('node-bourbon').includePaths
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

internals.bundle = function (bundler) {
  bundler
    .transform(require('envify/custom')({
      NODE_ENV: env
    }))
    .transform('browserify-shim');

  if (isEnv('production', 'staging')) { 
    bundler.transform('uglifyify');
  }

  return bundler
    .bundle()
    .pipe(source('app.js'))
    .pipe(plugins.if(
      isEnv('production', 'staging'),
      plugins.streamify(plugins.uglify())
    ))
    .pipe(gulp.dest('./build/scripts'));
};

gulp.task('bundle', function () {
  return internals.bundle(browserify(paths.main));
});

gulp.task('index', function () {
  return gulp.src('./index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['clean'], function (done) {
  runSequence(['bundle', 'vendor', 'templates', 'index', 'styles'], done);
});

gulp.task('watch', ['index', 'vendor', 'styles', 'templates'], function () {
  var bundler = watchify(paths.main);
  bundler.on('update', internals.bundle.bind(null, bundler));

  gulp.watch(paths.index, ['index']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch('./styles/**/*.scss', ['styles']);

  plugins.livereload.listen();
  gulp.watch(paths.build + '/**/*', plugins.livereload.changed);

  return internals.bundle(bundler);
});

gulp.task('server', function (done) {
  var server = superstatic({
    host: isEnv('development') && '0.0.0.0'
  });

  if (isEnv('development')) server.use(require('connect-livereload')()); 

  server.listen(8000, function () {
    plugins.util.log('Running on http://localhost:8000');
    done();
  });
});

gulp.task('serve', ['watch', 'server']);
