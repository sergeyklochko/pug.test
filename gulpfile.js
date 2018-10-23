const gulp = require('gulp');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css')
const flatten = require('gulp-flatten');

var destdir = './build';

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
  console.log(destdir);
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

function publish(){
  destdir = './docs';
  clean();
  buildCSS();
  buildHTML();
  buildImages();
  return console.log(destdir);
}

function buildProject(){
  clean();
  buildCSS();
  buildHTML();
  buildImages();
}

function clean(){
  return del([destdir+'/*'])
}

gulp.task('styles', buildCSS); // process CSS
gulp.task('pug', buildHTML); //process HTML
gulp.task('img', buildImages); // process images
gulp.task('build', buildProject); // build for local test
gulp.task('publish', publish) // publish it to GitPages

// 123
