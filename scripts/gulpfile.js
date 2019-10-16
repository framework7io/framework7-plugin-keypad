/* eslint no-console: ["error", { allow: ["log"] }] */
const gulp = require('gulp');
const connect = require('gulp-connect');
const gopen = require('gulp-open');

const buildJs = require('./build-js.js');
const buildLess = require('./build-less.js');
const buildDemo = require('./build-demo.js');

// Tasks
gulp.task('js', buildJs);
gulp.task('less', buildLess);
gulp.task('demo', buildDemo);

gulp.task('build', gulp.series(['js', 'less']));

gulp.task('watch', () => {
  gulp.watch('./src/*.js', gulp.series(['js']));
  gulp.watch('./src/*.less', gulp.series(['less']));
});

gulp.task('connect', () => {
  connect.server({
    root: ['./'],
    livereload: false,
    port: '3000',
  });
});

gulp.task('open', () => {
  gulp.src('./demo/index.html').pipe(gopen({ uri: 'http://localhost:3000/demo/' }));
});

gulp.task('server', gulp.parallel(['watch', 'connect', 'open']));

gulp.task('default', gulp.series(['server']));
