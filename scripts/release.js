/* eslint-disable import/no-extraneous-dependencies */
const exec = require('exec-sh');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const pkgDist = require('../dist/package.json');

async function release() {
  const options = await inquirer.prompt([
    {
      type: 'input',
      name: 'version',
      message: 'Version:',
      default: pkgDist.version,
    },
  ]);

  // Set version
  pkgDist.version = options.version;

  fs.writeFileSync(
    path.resolve(__dirname, '../dist/package.json'),
    JSON.stringify(pkgDist, null, 2),
  );

  await exec.promise('git pull');
  await exec.promise('npm i');

  await exec.promise(`npm run build`);

  // NPM publish
  await exec.promise('cd ./dist && npm publish');

  // Build Production Demo
  await exec.promise('npm run build-demo');

  // Git commit & push
  await exec.promise('git add .');
  await exec.promise(`git commit -m "${pkgDist.version} release"`);
  await exec.promise('git push');
  await exec.promise(`git tag v${pkgDist.version}`);
  await exec.promise('git push origin --tags');
}

release();
