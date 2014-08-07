'use strict';

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var streamqueue = require('streamqueue');
var browserify  = require('browserify');
var superstatic = require('superstatic');
var watchify    = require('watchify');
var through     = require('through2');
var path        = require('path');
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
  return gulp.src('./src/**/views/*.html')
    .pipe(through.obj(function (file, enc, callback) {
      file.path = file.path.replace('/views', '');
      this.push(file);
      callback();
    }))
    .pipe(gulp.dest('build/views'));
});

internals.hashes = {};

internals.manifest = function () {
  return through.obj(function (file, enc, callback) {
    internals.hashes[path.basename(file.revOrigPath)] = path.basename(file.path);
    this.push(file);
    callback();
  });
};

gulp.task('styles', function () {
  return gulp.src('./styles/main.scss')
    .pipe(plugins.sass({
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(plugins.if(isEnv('production', 'staging'), plugins.rev()))
    .pipe(plugins.if(isEnv('production', 'staging'), internals.manifest()))
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('vendor', function () {
  return gulp.src([
    './components/angular/angular.js',
    './components/angular-messages/angular-messages.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js',
    './components/stripe/index.js',
    './components/firebase/firebase.js',
    './components/angularfire/angularfire.js',
    './components/raven-js/dist/raven.js',
    './components/raven-js/plugins/angular.js'
  ])
  .pipe(plugins.concat('vendor.js'))
  .pipe(plugins.if(isEnv('production', 'staging'), plugins.uglify()))
  .pipe(plugins.if(isEnv('production', 'staging'), plugins.rev()))
  .pipe(plugins.if(isEnv('production', 'staging'), internals.manifest()))
  .pipe(gulp.dest('./build/scripts'));
});

internals.browserify = function (bundler) {
  bundler
    .transform('browserify-shim');

  if (isEnv('production', 'staging')) { 
    bundler.transform('uglifyify');
  }

  return bundler
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer());
};

internals.templates = function () {
  return gulp.src(paths.templates)
    .pipe(plugins.if(isEnv('production', 'staging'), plugins.htmlmin({
      collapseWhitespace: true
    })))
    .pipe(plugins.angularTemplatecache({
      module: 'PledgeApp',
      root: '/views'
    }));
};

gulp.task('bundle', function () {
  return streamqueue({objectMode: true},
    internals.browserify(browserify(paths.main)),
    internals.templates()
  )
  .pipe(plugins.concat('app.js'))
  .pipe(plugins.if(isEnv('production', 'staging'), plugins.uglify()))
  .pipe(plugins.if(isEnv('production', 'staging'), plugins.rev()))
  .pipe(plugins.if(isEnv('production', 'staging'), internals.manifest()))
  .pipe(gulp.dest(paths.build + '/scripts'));
});

gulp.task('index', function () {
  return gulp.src('./index.html')
    .pipe(plugins.if(isEnv('production', 'staging'), plugins.htmlmin({
      collapseWhitespace: true
    })))
    .pipe(plugins.if(isEnv('production', 'staging'), through.obj(function (file, enc, callback) {
      var contents = String(file.contents);
      for (var original in internals.hashes) {
        contents = contents.replace(original, internals.hashes[original]);
      }
      file.contents = new Buffer(contents);
      this.push(file);
      callback();
    })))
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['clean'], function (done) {
  runSequence(['bundle', 'vendor', 'templates', 'styles'], 'index', done);
});

gulp.task('watch', ['index', 'vendor', 'styles', 'templates'], function () {
  var bundler = watchify(paths.main);
  var bundle = function () {
    internals.browserify(bundler).pipe(gulp.dest(paths.build + '/scripts'));
  };
  bundler.on('update', bundle);

  gulp.watch(paths.index, ['index']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch('./styles/**/*.scss', ['styles']);

  plugins.livereload.listen();
  gulp.watch(paths.build + '/**/*', plugins.livereload.changed);

  return bundle();
});

gulp.task('server', function (done) {
  var server = superstatic({
    host: isEnv('development') && '0.0.0.0',
    localEnv: require('./environments/' + env + '.json')
  });

  if (isEnv('development')) server.use(require('connect-livereload')()); 

  server.listen(8000, function () {
    plugins.util.log('Running on http://localhost:8000');
    done();
  });
});

gulp.task('serve', ['watch', 'server']);
