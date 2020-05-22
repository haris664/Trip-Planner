const gulp = require('gulp');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel1 = require('gulp-babel');

function minifyCss() {
  return gulp.src('src/css/*.css')
  .pipe(cleanCss())
  .pipe(gulp.dest('dist/css'));
}

function html() {
  return gulp.src('src/index.html')
  .pipe(gulp.dest('dist'))
}

function transpileJs() {
 return gulp.src('src/js/app.js')
  .pipe(babel1({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
} 

function watch() {
  gulp.watch('src/css/*.css',minifyCss);
  gulp.watch('src/js/app.js',transpileJs);
}

exports.default = gulp.series(html,minifyCss,transpileJs,watch);