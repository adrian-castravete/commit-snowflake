var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var del = require('delete');
var runSequence = require('run-sequence');

gulp.task('default', ['bundle']);

gulp.task('bundle', function () {
  var b;

  del.sync('js/snowflake*.js');
  b = browserify({
    'entries': 'src/snowflake.js'
  });
  b.bundle()
    .pipe(source('snowflake.js'))
    .pipe(buffer())
//    .pipe(minify())
    .pipe(gulp.dest('js/'));
});

gulp.task('watch', function () {
  gulp.src('src/**/*.js')
    .pipe(watch('src/**/*.js'))
    .on('change', function () {
      runSequence('bundle');
    });
});

