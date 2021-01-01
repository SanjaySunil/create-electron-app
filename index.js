#!/usr/bin/env node
const chalk = require("chalk");
const { exec } = require("child_process");

const installPackages = () => {
  exec(
    "cd Electron-Boilerplate && rmdir .git && npm install",
    (error, stdout, stderr) => {
      if (error) {
        console.log(`[ERROR]: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`[STDERR]: ${stderr}`);
        return;
      }
      console.log(`[CREATE-ELECTRON-APP]: ${stdout}`);
      console.log("\nSuccess!\n To start your electron app:\ncd Electron-Boilerplate\nnpm start\n\nHappy Hacking!")
    }
  );
};

const install = () => {
  exec(
    "git clone https://github.com/D3VSJ/Electron-Boilerplate",
    (error, stdout, stderr) => {
      if (error) {
        console.log(`[ERROR]: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`[STDERR]: ${stderr}`);
        return;
      }
      console.log(`[CREATE-ELECTRON-APP]: ${stdout}`);
      installPackages();
    }
  );
};

const createElectronApp = () => {
  exec("git --version", (error, stdout, stderr) => {
    if (error) {
      console.log(`[ERROR]: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`[STDERR]: ${stderr}`);
      return;
    }
    console.log(`[CREATE-ELECTRON-APP]: ${stdout}`);
    install();
  });
};

createElectronApp();
