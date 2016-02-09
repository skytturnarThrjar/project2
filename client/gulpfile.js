var gulp = require('gulp'),
   uglify = require('gulp-uglify'),
   concat = require('gulp-concat');

gulp.task('minify', function () {
   gulp.src('src/**/*.js')
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('build'))
});