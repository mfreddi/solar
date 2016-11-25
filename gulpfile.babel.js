
'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import babel from 'gulp-babel';
import uglify from 'gulp-uglifyjs';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import concat from 'gulp-concat';
import browserify from 'gulp-browserify';

gulp.task('build-js', () => {
    gulp.src('./src/script.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', function(err){
            gutil.log(gutil.colors.red.bold('[browserify error]'));
            gutil.log(err.message);
            this.emit('end');
        })
        //.pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
gulp.task('build-html', () => {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist/'))
});

gulp.task('watch', ['build-js', 'build-html'], () => {
    gulp.watch('./src/**/*.js', ['build-js']);
    gulp.watch('./src/**/*.html', ['build-html']);
});

gulp.task('default', ['build-js', 'build-html']);
