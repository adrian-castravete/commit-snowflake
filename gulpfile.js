let browserify = require("browserify");
let babelify = require("babelify");
let gulp = require("gulp");
let source = require("vinyl-source-stream");
let buffer = require("vinyl-buffer");
// let uglify = require("gulp-uglify");
let watch = require("gulp-watch");
let runSequence = require("run-sequence");
let plumber = require("gulp-plumber");

gulp.task("build", function() {
  // set up the browserify instance on a task basis
  let b = browserify({
    entries: "./src/starter.js",
    debug: true
  }).transform(babelify, {presets: ["es2015"]});

  return b.bundle()
    .pipe(source("snowflake.js"))
    .pipe(buffer())
        // Add transformation tasks to the pipeline here.
        // .pipe(uglify())
        .on("error", function(err) {
          console.error(err);
          return false;
        })
    .pipe(gulp.dest("./js/"));
});

gulp.task("watch", function() {
  return gulp.src("./src/**/*.js")
    .pipe(plumber())
    .pipe(watch("./src/**/*.js"))
    .on("change", function(fileName) {
      console.info(`${fileName} changed; rebuilding`);
      runSequence("build");
    });
});

gulp.task("default", ["build"]);
