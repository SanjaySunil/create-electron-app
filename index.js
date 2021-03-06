#!/usr/bin/env node

/**
 * @file index.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

const {exec} = require('child_process');
const download = require('download');

const chalk = require('chalk');
const fs = require('fs');
const ora = require('ora');

const package = require('./package.json');

const installingBoilerplate = ora('Downloading Electron Boilerplate ...\n');
const installModules = ora('Installing dependencies ...\n');

const header = () => {
  console.clear();
  console.log(
      chalk.blueBright(
          `Welcome to create-electron-app v${package.version}!\n</> by Sanjay Sunil (https://github.com/sanjaysunil)\n`,
      ),
  );
};

const runChecks = () => {
  if (fs.existsSync('electron-app')) {
    installingBoilerplate.stopAndPersist({
      symbol: '❌',
      text: 'A folder named electron-app already exists! Please remove!',
    });
    process.exit();
  }
};

const installBoilerplate = (callback) => {
  (async () => {
    try {
      await download(
          'https://github.com/sanjaysunil/Electron-Boilerplate/archive/master.zip',
          '.',
          {extract: true},
      );
      callback();
    } catch (err) {
      installingBoilerplate.stopAndPersist({
        symbol: '❌',
        text: `Received ${err.statusCode} error code.\n`,
      });
      return process.exit();
    }
  })();
};

const install = () => {
  fs.rename('Electron-Boilerplate-master', 'electron-app', (err) => {
    if (err) {
      if (err.syscall == 'rename') {
        installingBoilerplate.stopAndPersist({
          symbol: '❌',
          text: `Cannot rename electron app.`,
        });
        process.exit();
      } else {
        throw err;
      }
    }

    installingBoilerplate.stopAndPersist({
      symbol: '✔',
      text: 'Downloaded Electron Boilerplate!\n',
    });
    installModules.start();

    exec('cd electron-app && npm install', (error, stdout, stderr) => {
      if (error) {
        installingBoilerplate.stopAndPersist({
          symbol: '❌',
          text: `${error.message}`,
        });
        process.exit();
      }
      if (stderr) {
        installingBoilerplate.stopAndPersist({
          symbol: '❌',
          text: `${stderr}`,
        });
        process.exit();
      }

      installModules.stopAndPersist({
        symbol: '✔',
        text: 'Installed dependencies!\n',
      });
      console.log('\nSuccess! To start your electron app, run the following:');
      console.log(chalk.grey('\ncd electron-app'));
      console.log(chalk.grey('\nnpm start'));
      console.log(chalk.yellow('\nHappy Developing!'));
    });
  });
};

const createElectronApp = () => {
  header();
  runChecks();
  installingBoilerplate.start();
  installBoilerplate(install);
};

createElectronApp();
