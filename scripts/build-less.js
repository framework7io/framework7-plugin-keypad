/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const less = require('less');
const path = require('path');
const CleanCSS = require('clean-css');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

// eslint-disable-next-line
const banner = require('./banner.js');

const l = (content, resolvePath = path.resolve(__dirname, '../src')) =>
  new Promise((resolve, reject) => {
    less
      .render(content, { paths: [resolvePath] })
      .then((result) => {
        resolve(result.css);
      })
      .catch((err) => {
        reject(err);
        throw err;
      });
  });

const a = async (content, { from = undefined, to = undefined } = {}) =>
  new Promise((resolve, reject) => {
    postcss([autoprefixer])
      .process(content, { from, to })
      .then((result) => {
        result.warnings().forEach((warn) => {
          // eslint-disable-next-line
          console.warn(warn.toString());
        });
        resolve(result.css);
      })
      .catch((err) => {
        reject(err);
        throw err;
      });
  });

const c = (content, options = {}) => {
  // eslint-disable-next-line
  options = Object.assign(
    {
      compatibility: '*,-properties.zeroUnits',
    },
    options,
  );

  return new Promise((resolve, reject) => {
    if (content instanceof Promise) {
      content
        .then((_c) => {
          const minified = new CleanCSS(options).minify(_c);
          resolve(minified.styles);
        })
        .catch((err) => {
          reject(err);
          throw err;
        });
      return;
    }
    const minified = new CleanCSS(options).minify(content);
    resolve(minified.styles);
  });
};

async function buildLess() {
  const lessContent = fs.readFileSync(
    path.resolve(__dirname, '../src/framework7-keypad.less'),
    'utf-8',
  );
  const cssContent = await a(
    await l(lessContent, path.resolve(__dirname, '../src')),
  );
  fs.writeFileSync(
    path.resolve(__dirname, `../dist/framework7-keypad.css`),
    `${banner}\n${cssContent}`,
  );
  const minifiedContent = await c(cssContent);
  fs.writeFileSync(
    path.resolve(__dirname, `../dist/framework7-keypad.min.css`),
    `${banner}\n${minifiedContent}`,
  );
}

module.exports = buildLess;
