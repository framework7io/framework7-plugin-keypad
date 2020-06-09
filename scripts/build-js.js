/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint import/no-unresolved: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */
const fs = require('fs');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const Terser = require('terser');
const banner = require('./banner.js');

let cache;

async function es() {
  const env = process.env.NODE_ENV || 'development';
  const format = 'es';

  return rollup.rollup({
    input: './src/framework7-keypad.js',
    cache,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.FORMAT': JSON.stringify(format),
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
      commonjs(),
    ],
  }).then((bundle) => {
    cache = bundle;
    return bundle.write({
      format: 'es',
      file: `./${env === 'development' ? 'build' : 'dist'}/framework7-keypad.esm.js`,
      name: 'Framework7Keypad',
      strict: true,
      sourcemap: false,
      banner,
    });
  });
}

async function umd() {
  const env = process.env.NODE_ENV || 'development';
  const format = process.env.FORMAT || 'umd';

  return rollup.rollup({
    input: './src/framework7-keypad.js',
    cache,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.FORMAT': JSON.stringify(format),
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
      commonjs(),
      buble(),
    ],
  }).then((bundle) => {
    cache = bundle;
    return bundle.write({
      format: 'umd',
      file: `./${env === 'development' ? 'build' : 'dist'}/framework7-keypad.js`,
      name: 'Framework7Keypad',
      strict: true,
      sourcemap: false,
      banner,
    });
  }).then((bundle) => {
    if (env === 'development') {
      return;
    }
    const result = bundle.output[0];
    const minified = Terser.minify(result.code, {
      sourceMap: {
        content: env === 'development' ? result.map : undefined,
        filename: env === 'development' ? undefined : 'framework7-keypad.min.js',
        url: 'framework7-keypad.min.js.map',
      },
      output: {
        preamble: banner,
      },
    });

    fs.writeFileSync('./dist/framework7-keypad.min.js', minified.code);
    fs.writeFileSync('./dist/framework7-keypad.min.js.map', minified.map);
  });
}
async function buildJs() {
  const env = process.env.NODE_ENV || 'development';

  await umd();
  if (env === 'production') {
    await es();
  }
}

module.exports = buildJs;
