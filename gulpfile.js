const gulp = require('gulp');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');

function minifyCss() {
  gulp.src('src/css/*.css')
  .pipe(cleanCss())
  .pipe(gulp.dest('dist/css'));
}

exports.default = minifyCss;