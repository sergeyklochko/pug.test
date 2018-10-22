const gulp = require('gulp');
const pug = require('gulp-pug');

function buildHTML() {
  return gulp.src('./src/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest('./dest'))
}

gulp.task('pug', buildHTML);
