'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoPreFixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create();

// Copying materialize.min.css to styles folder
gulp.task('styles', function () {
  // Copy Materialize CSS to Styles folder
  gulp.src('./node_modules/materialize-css/dist/css/*.css')
    .pipe(gulp.dest('./app/styles'));


});

// Copying materialize.min.js to scripts folder
gulp.task('scripts', function () {
  // Copy Materialize JS to Scripts folder
  gulp.src('./node_modules/materialize-css/dist/js/*.js')
    .pipe(gulp.dest('./app/scripts'));
});

//SCSS to CSS
gulp.task('styles', function () {
  gulp.src('./app/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoPreFixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./app/styles/'))
    .pipe(browserSync.stream());
});

// Build
gulp.task('build', ['styles']);

// Watch Changes
gulp.task('serve', ['build'], function () {
  browserSync.init({
    server: "./app"
  });

  gulp.watch('./app/sass/**/*.scss', ['styles']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
