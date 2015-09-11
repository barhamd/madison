// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');

// Define default destination folder
var dest = 'public/';

// Concatenate & Minify JS Files
gulp.task('scripts', function() {
  var jsFiles = [ 'assets/javascripts/*.js' ];
  return gulp.src(mainBowerFiles().concat(jsFiles))
    .pipe(filter('*.js'))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(dest + 'js'));
});

// Default Task
gulp.task('default', ['scripts']);
