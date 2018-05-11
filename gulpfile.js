var gulp = require('gulp');
var cleanCSS = require("gulp-clean-css");
var minify   = require('gulp-minify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var $    = require('gulp-load-plugins')();

var sassPaths = [
  'node_modules/uikit/src/scss',
];
var jsPaths = [
  'node_modules/uikit/dist/js/uikit.js',
  'node_modules/uikit/dist/js/uikit-icons.js'
];

gulp.task('sass', function() {
  return gulp.src('src/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'expanded' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('scripts', function() {
  gulp.src( jsPaths )
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('default', ['sass', 'scripts'], function () {
  gulp.watch(['src/js/*.js'], ['scripts']);
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
  gulp.watch(['src/scss/**/**/*.scss'], ['sass']);
});
