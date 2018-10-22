const gulp = require('gulp');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const del = require('del');

function buildHTML() {
  return gulp.src('./src/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest('./build'))
}

function buildCSS() {
  return gulp.src('./src/**/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./build/css'));
}

function clean(){
  return del(['build/*'])
}

gulp.task('styles', buildCSS);
gulp.task('pug', buildHTML);
gulp.task('build', gulp.series(clean, gulp.parallel('styles', 'pug')));
