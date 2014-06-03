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

var production = (process.env.NODE_ENV === 'production' || process.env.CI);

gutil.log(gutil.colors.cyan('Running in ' + (production ? 'production' : 'development') + ' mode'));

gulp.task('lint', function () {
  return gulp.src(['app/src/**/*.js', 'test/**/*.js', 'gulpfile.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('dev:unit', function () {
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

gulp.task('unit', function (done) {
  browserify('./test/unit/index.js')
    .bundle({
      debug: true
    })
    .pipe(source('bundle-unit.js'))
    .pipe(gulp.dest('.tmp'))
    .on('end', function () {
      karma.server.start({
        frameworks: ['mocha', 'chai-sinon'],
        files: ['.tmp/bundle-unit.js'],
        port: 8080,
        browsers: ['PhantomJS'],
        singleRun: true
      })
      .then(function () {
        done();
      })
      .catch(function (err) {
        done(err);
        process.exit(1);
      });
    });
});

gulp.task('e2e', function () {

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
      include: ['./app/bower_components/bootstrap-stylus/stylus']
    }))
    .pipe(gulpif(production, plugins.minifyCss()))
    .pipe(gulp.dest('build/styles'));
});

gulp.task('browserify', function () {
  return browserify('./app/src/app/index.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulpif(production, streamify(plugins.ngmin())))
    .pipe(gulpif(production, streamify(plugins.uglify({mangle: false}))))
    .pipe(gulp.dest('./build'));
});

gulp.task('index', function () {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('build/images'));
});

gulp.task('build', ['clean'], function (done) {
  runSequence(['browserify', 'templates', 'index', 'styles', 'images'], done);
});

gulp.task('serve', function () {
  require('http').createServer(require('ecstatic')({root: __dirname + '/build'})).listen(8000);
});

gulp.task('default', ['test', 'build']);