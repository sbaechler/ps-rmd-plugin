var gulp = require('gulp-help')(require('gulp')),
  jshint = require('gulp-jshint'),
  gutil = require('gulp-util'),
  inject = require('gulp-inject'),
  shell = require('gulp-shell'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  del = require('del'),
  path = require('path'),
  fs = require('fs-extra'),
  wiredep = require('wiredep').stream,
  pkg = require('./package.json'),
  concat = require('gulp-concat'),
  runSequence = require('run-sequence');

// Files that will be run against JSHint
var allSrcFiles = [
    'app/**/*.js',
    'jsx/**/*.jsx',
    'root/**/*.js'
  ],
  // The CSS files what will be injected into the index
  cssFiles = 'css/**/*.css',
  // Files that will be bundled
  jsFiles = 'app/**/*.js',
  // Files that will be built into CSS
  scssFiles = './sass/**/*.scss',
  // Files that will be compiled into the ZXP
  buildFiles = [
    'bundle/bundle.js',
    'CSXS/manifest.xml',
    'ext/**/*',
    'jsx/**/*',
    'root/**/*',
    'bower_components/**/*'
  ],
  // The selfSigned certificate used to compile the extension
  certPath = path.join('./bin', 'testCert.p12'),
  // The path and name of the compiled ZXP file
  zxpPath = path.join('./build', 'test.zxp'),
  // The path to the zxpSignCmd binary
  binPath = path.join('./bin', 'ZXPSignCmd');

gulp.task('hint', 'Run JSHint against your project files', function () {
  return gulp.src(allSrcFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('wire', 'Wire dependencies to index.html', function () {
  var libs = gulp.src('ext/**/*.js', {read: false});
  var frontEnd = gulp.src(['bundle/bundle.js', cssFiles], {read: false});
  var backEnd = gulp.src(['root/**/*.js'], {read: false});

  return gulp.src('./root/index.html')
    .pipe(inject(libs, {name: 'ext', relative: true}))
    .pipe(inject(frontEnd, {relative: true}))
    .pipe(inject(backEnd, {name: 'node', relative: true}))
    .pipe(wiredep({exclude:'jquery'}))
    .pipe(gulp.dest('./root'));
});

gulp.task('sass', 'Build sass files', function () {
  return gulp.src(scssFiles)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
      .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./bundle'));
});

gulp.task('watch', 'Build based on file changes', function () {
  gulp.watch(jsFiles, ['scripts']);
  gulp.watch(scssFiles, ['sass']);
  var dependencyFiles = ['bower.json', 'package.json'];
  dependencyFiles.forEach(function(files) {
      gulp.watch(files, ['wire']);
  });
});

gulp.task('cert', 'Create a signing cert for your extension', shell.task([
    InsertSpaces(binPath,
      '-selfSignedCert',
      'US',
      'NA',
      'company',
      'test',
      '01189998819991197253',
      path.join('./bin', 'testCert.p12'))
]));

gulp.task('build', 'Compile the bundled ZXP', function (cb) {
  runSequence('build:clean', 'sass', 'scripts', 'wire', 'build:dist', 'build:pkgDeps', 'build:compile', cb);
});

gulp.task('build:clean', false, function () {
  del.sync(['build/**/*', '!build', 'dist/**/*', '!dist']);
});

gulp.task('build:dist', false, function () {
  return gulp.src(buildFiles, {base: './'})
    .pipe(gulp.dest('dist'));
});

gulp.task('build:pkgDeps', false, function () {
  for(var dep in pkg.dependencies) {
    fs.copy(path.join('./node_modules/', dep), path.join('./dist', 'node_modules', dep), function (err) {
        if(err) {
          throw new gutil.PluginError('pkgDeps', err);
        }
    });
  }
});

gulp.task('build:compile', false, shell.task([
  InsertSpaces(binPath,
    '-sign',
    './dist',
    zxpPath,
    certPath,
    '01189998819991197253')
]));

function InsertSpaces () {
  var builtString = '';
  var args = Array.prototype.slice.call(arguments);
  args.forEach(function(val) {
      builtString = builtString + val + ' ';
  });
  return builtString;
};

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'sass']);