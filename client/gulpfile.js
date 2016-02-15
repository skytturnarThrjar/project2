var gulp = require('gulp'),
   uglify = require('gulp-uglify'),
   concat = require('gulp-concat');
  //  jshint = require('gulp-jshint');

  // define the default task and add the watch task to it
gulp.task('default', ['watch']);

gulp.task('minify', function () {
   gulp.src('src/**/*.js')
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('build'))
});

gulp.task('jshint', function() {
  gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['minify']);

  //gulp.watch('src/**/*.js', ['jshint']);
});
