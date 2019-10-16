/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const fs = require('fs');

function buildKs(cb) {
  const env = process.env.NODE_ENV || 'development';
  let indexContent = fs.readFileSync('./demo/index.html', 'utf8');
  if (env === 'development') {
    indexContent = indexContent
      .replace('../dist/framework7-keypad.min.css', '../build/framework7-keypad.css')
      .replace('../dist/framework7-keypad.min.js', '../build/framework7-keypad.js');
  } else {
    indexContent = indexContent
      .replace('../build/framework7-keypad.css', '../dist/framework7-keypad.min.css')
      .replace('../build/framework7-keypad.js', '../dist/framework7-keypad.min.js');
  }
  fs.writeFileSync('./demo/index.html', indexContent);
  if (cb) cb();
}

module.exports = buildKs;
