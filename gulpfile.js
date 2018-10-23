const gulp = require('gulp');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css')
const flatten = require('gulp-flatten');

const destdir = './docs';

function buildHTML() {
  return gulp.src('./src/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest(destdir))
}

const imgFiles = [
  './src/**/*.ico',
  './src/**/*.jpg'
];

function buildImages(){
  return gulp.src(imgFiles)
  .pipe(flatten())
  .pipe(gulp.dest(destdir+'/img'))
}

  const cssFiles = [
    './node_modules/normalize.css/normalize.css',
    './src/**/*.css'
  ];

function buildCSS() {
  return gulp.src(cssFiles)
    .pipe(concat('all.css'))
    .pipe(autoprefixer({
      browsers: ['> 0.1% '],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest(destdir+'/css'));
}

function clean(){
  return del([destdir+'/*'])
}

gulp.task('styles', buildCSS);
gulp.task('pug', buildHTML);
gulp.task('img', buildImages);
gulp.task('build', gulp.series(clean, gulp.parallel('styles', 'pug', 'img')));

// 123
