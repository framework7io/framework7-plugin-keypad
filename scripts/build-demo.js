/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const gulp = require('gulp');
const modifyFile = require('gulp-modify-file');

function buildKs(cb) {
  const env = process.env.NODE_ENV || 'development';
  gulp.src('./demo/index.html')
    .pipe(modifyFile((content) => {
      if (env === 'development') {
        return content
          .replace('../dist/framework7.keypad.min.css', '../build/framework7.keypad.css')
          .replace('../dist/framework7.keypad.min.js', '../build/framework7.keypad.js');
      }
      return content
        .replace('../build/framework7.keypad.css', '../dist/framework7.keypad.min.css')
        .replace('../build/framework7.keypad.js', '../dist/framework7.keypad.min.js');
    }))
    .pipe(gulp.dest('./demo/'))
    .on('end', () => {
      if (cb) cb();
    });
}

module.exports = buildKs;
