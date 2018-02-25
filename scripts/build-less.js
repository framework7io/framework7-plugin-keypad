/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint import/no-unresolved: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const gulp = require('gulp');
const fs = require('fs');
const modifyFile = require('gulp-modify-file');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const header = require('gulp-header');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const banner = require('./banner.js');

function build(cb) {
  const env = process.env.NODE_ENV || 'development';
  gulp.src('./src/framework7.keypad.less')
    .pipe(less())
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(autoprefixer({
      cascade: false,
    }))
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(header(banner))
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/`))
    .on('end', () => {
      if (env === 'development') {
        if (cb) cb();
        return;
      }
      gulp.src('./dist/framework7.keypad.css')
        .pipe(cleanCSS({
          advanced: false,
          aggressiveMerging: false,
        }))
        .pipe(header(banner))
        .pipe(rename((filePath) => {
          filePath.basename += '.min';
        }))
        .pipe(gulp.dest('./dist/'))
        .on('end', () => {
          if (cb) cb();
        });
    });
}


function buildLess(cb) {
  const env = process.env.NODE_ENV || 'development';

  build(() => {
    if (cb) cb();
  });
}

module.exports = buildLess;
