#!/usr/bin/env node

/**
 * create-electron-app
 * Generate an electron app within a minute!
 *
 * @file index.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

const {exec} = require('child_process');
const download = require('download');
const chalk = require('chalk');
const fs = require('fs');
const ora = require('ora');
const package = require('../package.json');

const messages = {
  welcome: `Welcome to create-electron-app v${package.version}!\n</> by Sanjay Sunil (https://github.com/sanjaysunil)\n`,
  success: {
    downloadedBoilerplate: 'Downloaded Electron Boilerplate!\n',
    installedDependencies: 'Installed dependencies!\n',
  },
  error: {
    folderExists: 'A folder named electron-app already exists!',
    cannotRename: 'Cannot rename electron app.',
  },
  status: {
    downloading: 'Downloading Electron Boilerplate ...\n',
    installingDependencies: 'Installing dependencies ...\n',
  },
};

const installingBoilerplate = ora(messages.status.downloading);
const installModules = ora(messages.status.installingDependencies);

/**
 * Header Component
 */
const header = () => {
  console.clear();
  console.log(
      chalk.blueBright(
          messages.welcome,
      ),
  );
};

/**
 * Checks to see if a folder named 'electron-app` already   exists.
 */
const runChecks = () => {
  if (fs.existsSync('electron-app')) {
    installingBoilerplate.stopAndPersist({
      symbol: '❌',
      text: messages.error.folderExists,
    });
    process.exit();
  }
};

/**
 * Downloads the boilerplate from GitHub.
 */
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

/**
 * Installs dependencies.
 */
const install = () => {
  fs.rename('Electron-Boilerplate-master', 'electron-app', (err) => {
    if (err) {
      if (err.syscall == 'rename') {
        installingBoilerplate.stopAndPersist({
          symbol: '❌',
          text: messages.error.cannotRename,
        });
        process.exit();
      } else {
        throw err;
      }
    }

    installingBoilerplate.stopAndPersist({
      symbol: '✔',
      text: messages.success.downloadedBoilerplate,
    });
    installModules.start();

    exec(`cd electron-app && npm install 
    --no-optional`, (error, stdout, stderr) => {
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
        text: messages.success.installedDependencies,
      });
      console.log('\nSuccess! To start your electron app, run the following:');
      console.log(chalk.grey('\ncd electron-app'));
      console.log(chalk.grey('\nnpm start'));
      console.log(chalk.yellow('\nHappy Developing!'));
    });
  });
};

/**
 * Begin create-electron-app.
 */
const createElectronApp = () => {
  header();
  runChecks();
  installingBoilerplate.start();
  installBoilerplate(install);
};

createElectronApp();
