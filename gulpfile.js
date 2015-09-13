// Include gulp
var gulp = require('gulp');

// Include plugins
var sass           = require('gulp-ruby-sass');
var concat         = require('gulp-concat');
var uglify         = require('gulp-uglify');
var rename         = require('gulp-rename');
var filter         = require('gulp-filter');
var minifyCss      = require('gulp-minify-css');
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

// Concatenate CSS
gulp.task('stylesheets', function() {
  var cssFiles = ['assets/stylesheets/*.css']
  return gulp.src(mainBowerFiles().concat(cssFiles))
    .pipe(filter('*.css'))
    .pipe(concat('main.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(dest + 'css'));
});

// Concatenate Sass
gulp.task('sass', function() {
  var sassFiles = 'assets/stylesheets/application.scss'
  return sass(sassFiles, {style: 'compressed', emitCompileError: true})
    .pipe(gulp.dest(dest + 'scss'));
});

// Default Task
gulp.task('default', ['scripts', 'stylesheets', 'sass']);
