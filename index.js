#!/usr/bin/env node
const chalk = require("chalk");
const { exec } = require("child_process");
const download = require("download");
const fs = require('fs');

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

    header();
    console.log(chalk.green("Installed Electron Boilerplate!\n"));
    console.log(chalk.green("Directory renamed successfully!\n"));
    console.log("Installing dependencies ...");

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

      header();
      console.log(chalk.green("Installed Electron Boilerplate!\n"));
      console.log(chalk.green("Directory renamed successfully!\n"));
      console.log(chalk.green("Installed dependencies!"));
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
    await download(
      "https://github.com/D3VSJ/Electron-Boilerplate/archive/master.zip",
      ".",
      { extract: true }
    );
    callback();
  })();
};

/**
 * @description Header Component of the App.
 */

const header = () => {
  console.clear();
  console.log(
    chalk.blueBright(
      "Welcome to create-electron-app!\n</> with ❤ by Sanjay Sunil (https://github.com/D3VSJ)\n"
    )
  );
};

/**
 * @description Create Electron App Main Function.
 */

const createElectronApp = () => {
  header();
  console.log("Installing Electron Boilerplate ...");
  installBoilerplate(install);
};

createElectronApp();
