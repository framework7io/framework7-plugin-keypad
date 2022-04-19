/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint import/no-unresolved: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */
const fs = require('fs');
const rollup = require('rollup');
const Terser = require('terser');
// eslint-disable-next-line
const banner = require('./banner.js');

let cache;

async function es() {
  return rollup
    .rollup({
      input: './src/framework7-keypad.js',
      cache,
    })
    .then((bundle) => {
      cache = bundle;
      return bundle.write({
        format: 'es',
        file: `./dist/framework7-keypad.esm.js`,
        name: 'Framework7Keypad',
        strict: true,
        sourcemap: false,
        banner,
      });
    });
}

async function umd() {
  return rollup
    .rollup({
      input: './src/framework7-keypad.js',
      cache,
    })
    .then((bundle) => {
      cache = bundle;
      return bundle.write({
        format: 'umd',
        file: `./dist/framework7-keypad.js`,
        name: 'Framework7Keypad',
        strict: true,
        sourcemap: false,
        banner,
      });
    })
    .then(async (bundle) => {
      const result = bundle.output[0];
      const minified = await Terser.minify(result.code, {
        sourceMap: {
          content: undefined,
          filename: 'framework7-keypad.min.js',
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
  await umd();
  await es();
}

module.exports = buildJs;
