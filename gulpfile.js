'use strict';

var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var gutil       = require('gulp-util');
var streamify   = require('gulp-streamify');
var plugins     = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var karma       = require('karma-as-promised');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var connect     = require('connect');
var http        = require('http');

var production = (process.env.NODE_ENV === 'production' || process.env.CI);

gutil.log(gutil.colors.cyan('Running in ' + (production ? 'production' : 'development') + ' mode'));

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

gulp.task('test', function (done) {
  runSequence('unit', 'e2e', done);
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
      compress: true
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
  .pipe(gulpif(production, plugins.uglify()))
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

// gulp.task('images', function () {
//   return gulp.src('app/images/**/*')
//     .pipe(gulp.dest('build/images'));
// });

gulp.task('build', ['clean'], function (done) {
  runSequence(['browserify', 'templates', 'index', 'styles', 'images'], done);
});

gulp.task('serve', function (done) {
  var server = http.createServer(connect()
    .use(connect.logger('dev'))
    .use(connect.static('build'))
  )
  .listen(8000, function () {
    gutil.log('Running on http://localhost:' + server.address().port);
  });
});

gulp.task('default', ['test', 'build']);
