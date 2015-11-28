var gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  minify = require('gulp-minify'),
  rename = require('gulp-rename'),
  watch = require('gulp-watch'),
  del = require('delete'),
  runSequence = require('run-sequence');

gulp.task('default', ['bundle']);

gulp.task('bundle', function () {
  var b;

  del.sync('js/**/*.*');
  b = browserify({
    'entries': 'src/snow-flake.js'
  });
  b.bundle()
    .pipe(source('snow-flake.js'))
    .pipe(buffer())
    .pipe(minify())
    .pipe(gulp.dest('js/'));
});

gulp.task('watch', function () {
  gulp.src('src/**/*.js')
    .pipe(watch('src/**/*.js'))
    .on('change', function () {
      runSequence('bundle');
    });
});

