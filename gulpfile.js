var gulp = require('gulp');
var BUILD_PATH = './build';

gulp.task('copy-index', function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('copy-bootstrap', function () {
  return gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('copy-weather-styles', function () {
  return gulp.src([
    './node_modules/weather-icons/css/weather-icons.css'
  ]).pipe(gulp.dest(BUILD_PATH));
});

gulp.task('copy-weather-icons', function () {
  return gulp.src(['./node_modules/weather-icons/font/*'])
    .pipe(gulp.dest(BUILD_PATH + '/font'));
});

gulp.task('copy-toastr', function () {
  return gulp.src('./node_modules/toastr/build/toastr.css')
    .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('default', [
  'copy-index',
  'copy-bootstrap',
  'copy-weather-styles',
  'copy-weather-icons',
  'copy-toastr'
]);