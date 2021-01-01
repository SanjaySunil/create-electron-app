#!/usr/bin/env node
const chalk = require("chalk");
const { exec } = require("child_process");
const download = require("download");
const fs = require('fs');
const ora = require('ora');

const installingBoilerplate = ora("Downloading Electron Boilerplate ...\n")
const installDepend = ora("Installing dependencies ...\n")

/**
 * @description Installation process. This is where the node_modules and the electron app is renamed.
 */

const install = () => {

  /**
   * @description Electron App is renamed here.
   */

  fs.rename("Electron-Boilerplate-master", "electron-app", (err) => {
    if (err) {
      throw err;
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
       * @description Display any necessary error messages.
       */

      if (error) {
        console.log(chalk.red(`\n[ERROR]: ${error.message}`));
        return;
      }
      if (stderr) {
        console.log(chalk.red(`\n[STDERR]: ${stderr}`));
        return;
      }

      /**
       * @description Success message, at this stage, the app is installed successfully.
       */

      installDepend.stopAndPersist({symbol: '✔', text: "Installed dependencies!\n"})
      console.log("\nSuccess! To start your electron app, run the following:");
      console.log(chalk.grey("\ncd electron-app"));
      console.log(chalk.grey("\nnpm start"));
      console.log(chalk.yellow("\nHappy Hacking!"));

    });

  });
};

/**
 * @description Installation of Boilerplate.
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
      return;
    }
  })();
};

/**
 * @description Header Component of the App.
 */

const header = () => {
  console.clear();
  console.log(
    chalk.blueBright(
      "Welcome to create-electron-boilerplate!\n</> with ❤ by Sanjay Sunil (https://github.com/D3VSJ)\n"
    )
  );
};

/**
 * @description Create Electron App Main Function.
 */

const createElectronApp = () => {
  header();
  installingBoilerplate.start()
  installBoilerplate(install);
};

createElectronApp();
