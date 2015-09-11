// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var debug = require('gulp-debug');

// Define default destination folder
var dest = 'public/';

// Concatenate & Minify JS Files
gulp.task('scripts', function() {
  // Why do I need to include codemirror if mainBowerFiles should've covered it? (Outside of including modes with bower.json)
  var jsFiles = [
    'bower_components/codemirror/lib/codemirror.js',
    'bower_components/codemirror/mode/htmlembedded/htmlembedded.js',
    'bower_components/codemirror/mode/htmlmixed/htmlmixed.js',
    'bower_components/codemirror/mode/css/css.js',
    'bower_components/codemirror/mode/javascript/javascript.js',
    'bower_components/codemirror/mode/xml/xml.js',
    'bower_components/codemirror/addon/mode/multiplex.js',
    'assets/javascripts/*.js'
  ];
  return gulp.src(mainBowerFiles().concat(jsFiles))
    .pipe(filter('*.js'))
    .pipe(debug({title: 'unicorn:'}))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(dest + 'js'));
});

// Default Task
gulp.task('default', ['scripts']);
