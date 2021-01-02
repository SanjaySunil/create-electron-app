#!/usr/bin/env node

/**
 * @file index.js
 * @author Sanjay Sunil
 * @license GPL-3.0
 */

const chalk = require("chalk");
const { exec } = require("child_process");
const download = require("download");
const fs = require('fs');
const ora = require('ora');

const installingBoilerplate = ora("Downloading Electron Boilerplate ...\n")
const installDepend = ora("Installing dependencies ...\n")

/**
 * @name Installation-process
 * @description This is where the node_modules and the electron app is renamed.
 */

const install = () => {

  /**
   * @description Electron App is renamed here.
   */

  fs.rename("Electron-Boilerplate-master", "electron-app", (err) => {
    if (err) {
      if (err.syscall == 'rename') {
        installingBoilerplate.stopAndPersist({symbol: '❌', text: `Cannot rename electron app.`}) && process.exit()
      }
      else {
        throw err;
      }
    } 

    /**
     * @description Boilerplate has been downloaded.
     */

    installingBoilerplate.stopAndPersist({symbol: '✔', text: "Downloaded Electron Boilerplate!\n"})
    installDepend.start();


    /**
     * @description node_module installation.
     */

    exec("cd electron-app && npm install", (error, stdout, stderr) => {
      
      /**
       * @name Error-Message
       * @description Display any necessary error messages.
       */

      if (error) {
        installingBoilerplate.stopAndPersist({symbol: '❌', text: `${error.message}`}) && process.exit()
      }
      if (stderr) {
        installingBoilerplate.stopAndPersist({symbol: '❌', text: `${stderr}`}) && process.exit()
      }

      /**
       * @name Success-Message
       * @description At this stage, the app is installed successfully.
       */

      installDepend.stopAndPersist({symbol: '✔', text: "Installed dependencies!\n"})
      console.log("\nSuccess! To start your electron app, run the following:");
      console.log(chalk.grey("\ncd electron-app"));
      console.log(chalk.grey("\nnpm start"));
      console.log(chalk.yellow("\nHappy Developing!"));

    });

  });
};

/**
 * @name installBoilerplate
 * @description The boilerplate is downloaded at this stage.
 */

const installBoilerplate = (callback) => {
  (async () => {
    try {
      await download(
        "https://github.com/D3VSJ/Electron-Boilerplate/archive/master.zip",
        ".",
        { extract: true }
      );
      callback();
    }
    catch(err) {
      installingBoilerplate.stopAndPersist({symbol: '❌', text: `Received ${err.statusCode} error code. \n`})
      return process.exit();
    }
  })();
};

/**
 * @name Header 
 * @description This is the header that is displayed at the top of the CLI.
 */

const header = () => {
  console.clear();
  console.log(
    chalk.blueBright(
      "Welcome to create-electron-app!\n</> with ❤ by Sanjay Sunil (https://github.com/D3VSJ)\n"
    )
  );
};

const runChecks = () => {
  if (fs.existsSync('electron-app')) {
    installingBoilerplate.stopAndPersist({symbol: '❌', text: "A folder named electron-app already exists! Please remove!"}) && process.exit()
  }
}

/**
 * @name createElectronApp
 * @description Main function of create-electron-app.
 */

const createElectronApp = () => {
  header();
  runChecks();
  installingBoilerplate.start()
  installBoilerplate(install);
};

createElectronApp();
