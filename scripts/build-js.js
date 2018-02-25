/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint import/no-unresolved: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const gulp = require('gulp');
const rollup = require('rollup-stream');
const buble = require('rollup-plugin-buble');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const commonjs = require('rollup-plugin-commonjs');
const banner = require('./banner.js');

let cache;

function es(cb) {
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || 'universal';
  const format = 'es';
  let cbs = 0;

  rollup({
    input: './src/framework7.keypad.js',
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.TARGET': JSON.stringify(target),
        'process.env.FORMAT': JSON.stringify(format),
      }),
      resolve({ jsnext: true }),
      commonjs(),
    ],
    format: 'es',
    name: 'Framework7Keypad',
    strict: true,
    sourcemap: false,
    banner,
  })
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(source('framework7.keypad.js', './src'))
    .pipe(buffer())
    .pipe(rename('framework7.keypad.esm.js'))
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/`))
    .on('end', () => {
      cbs += 1;
      if (cbs === 2 && cb) cb();
    });
}
function umd(cb) {
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || 'universal';
  const format = process.env.FORMAT || 'umd';

  rollup({
    input: './src/framework7.keypad.js',
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.TARGET': JSON.stringify(target),
        'process.env.FORMAT': JSON.stringify(format),
      }),
      resolve({ jsnext: true }),
      commonjs(),
      buble(),
    ],
    format: 'umd',
    name: 'Framework7Keypad',
    strict: true,
    sourcemap: env === 'development',
    banner,
    cache,
  })
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .on('bundle', (bundle) => {
      cache = bundle;
    })
    .pipe(source('framework7.keypad.js', './src'))
    .pipe(buffer())
    .pipe(gulpif(env === 'development', sourcemaps.init({ loadMaps: true })))
    .pipe(gulpif(env === 'development', sourcemaps.write('./')))
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/`))
    .on('end', () => {
      if (env === 'development') {
        if (cb) cb();
        return;
      }
      // Minified version
      gulp.src('./dist/framework7.keypad.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(header(banner))
        .pipe(rename((filePath) => {
          filePath.basename += '.min';
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'))
        .on('end', () => {
          cb();
        });
    });
}
function buildJs(cb) {
  const env = process.env.NODE_ENV || 'development';

  const expectCbs = env === 'development' ? 1 : 2;
  let cbs = 0;

  umd(() => {
    cbs += 1;
    if (cbs === expectCbs) cb();

    if (env === 'production') {
      es(() => {
        cbs += 1;
        if (cbs === expectCbs) cb();
      });
    }
  });
}

module.exports = buildJs;
