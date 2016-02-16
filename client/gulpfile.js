var gulp = require('gulp'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
  //  jshint = require('gulp-jshint');
  // define the default task and add the watch task to it
gulp.task('connect', function() {
  connect.server({
    port: 8000
  });
});
gulp.task('default', ['watch', 'connect']);

gulp.task('minify', function () {
   gulp.src(['node_modules/socket.io-client/dist/socket.io.js', 'src/**/*.js'])
      //.pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('build'));
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
