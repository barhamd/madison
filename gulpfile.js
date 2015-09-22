// Include gulp
var gulp = require('gulp');

// Include plugins
var es             = require('event-stream');
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

// Concatenate All Stylesheets
gulp.task('stylesheets', function() {
  var cssFiles = gulp.src(mainBowerFiles()).pipe(filter('*.css'))
  var scssFiles = sass('assets/stylesheets/application.scss', {style: 'compressed', emitCompileError: true})

  return es.concat(cssFiles, scssFiles)
  .pipe(concat('main.css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifyCss())
  .pipe(gulp.dest(dest + 'css'));
});

// Bootstrap Icons. Should probably do this with sass.
gulp.task('bootstrap-icons', function() { 
  return gulp.src('bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*') 
    .pipe(gulp.dest('./public/fonts/bootstrap')); 
});

// Default Task
gulp.task('default', ['scripts', 'stylesheets', 'bootstrap-icons']);
