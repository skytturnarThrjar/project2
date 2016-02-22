var gulp = require('gulp'),
    connect = require('gulp-connect'),
    annotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint');
  // define the default task and add the watch task to it
gulp.task('connect', function() {
  connect.server({
    port: 8000
  });
});
gulp.task('default', ['watch', 'connect', 'minify','lint']);

gulp.task('minify', function () {
   gulp.src(['node_modules/socket.io-client/dist/socket.io.js', 'src/**/*.js'])
    .pipe(annotate())
    // .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('lint', function() {
    gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['minify']);
  gulp.watch('src/**/*.js', ['lint']);
});
