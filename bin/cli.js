#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// Package version and description
const packageJson = require('../package.json');

// Log a welcome message
console.log(chalk.bold.blue(`
╭───────────────────────────────────────╮
│                                       │
│   Create Electron App                 │
│   v${packageJson.version}                              │
│                                       │
╰───────────────────────────────────────╯
`));

// Validate project name
function validateProjectName(name) {
  if (!name) {
    return 'Project name cannot be empty';
  }
  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    return 'Project name can only contain letters, numbers, hyphens, and underscores';
  }
  return true;
}

program
  .version(packageJson.version)
  .description('Create a new Electron application with React or Vite')
  .argument('[project-name]', 'Name of the Electron application')
  .option('--skip-install', 'Skip installing dependencies')
  .option('--typescript', 'Use TypeScript template (coming soon)')
  .option('--verbose', 'Print additional logs')
  .action(async (projectName, options) => {
    try {
      // If project name wasn't provided as an argument, prompt for it
      let finalProjectName = projectName;
      if (!finalProjectName) {
        const answer = await inquirer.prompt([{
          type: 'input',
          name: 'projectName',
          message: 'What is the name of your project?',
          validate: validateProjectName
        }]);
        finalProjectName = answer.projectName;
      } else {
        // Validate the provided project name
        const validationResult = validateProjectName(finalProjectName);
        if (validationResult !== true) {
          console.error(chalk.red(`Error: ${validationResult}`));
          process.exit(1);
        }
      }
      
      const targetDir = path.join(process.cwd(), finalProjectName);
      
      // Check if directory already exists
      if (fs.existsSync(targetDir)) {
        const { overwrite } = await inquirer.prompt([{
          type: 'confirm',
          name: 'overwrite',
          message: `Directory ${finalProjectName} already exists. Do you want to overwrite it?`,
          default: false
        }]);
        
        if (!overwrite) {
          console.log(chalk.yellow('Operation cancelled.'));
          process.exit(0);
        }
        
        // Remove existing directory
        if (options.verbose) {
          console.log(`Removing existing directory: ${targetDir}`);
        }
        fs.removeSync(targetDir);
      }
      
      // Prompt for template choice
      const { template } = await inquirer.prompt([{
        type: 'list',
        name: 'template',
        message: 'Select a template:',
        choices: ['React', 'Vite']
      }]);
      
      console.log(chalk.blue(`\nCreating a new Electron app with ${template}...`));
      
      // Create project directory
      fs.mkdirSync(targetDir);
      
      // Copy template files
      const templateDir = path.join(__dirname, '../templates', template.toLowerCase());
      if (options.verbose) {
        console.log(`Copying files from ${templateDir} to ${targetDir}`);
      }
      fs.copySync(templateDir, targetDir);
      
      // Rename gitignore to .gitignore (npm ignores .gitignore when publishing)
      if (fs.existsSync(path.join(targetDir, 'gitignore'))) {
        fs.renameSync(
          path.join(targetDir, 'gitignore'),
          path.join(targetDir, '.gitignore')
        );
      }
      
      // Customize package.json
      const pkgJsonPath = path.join(targetDir, 'package.json');
      const pkgJson = require(pkgJsonPath);
      pkgJson.name = finalProjectName;
      fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
      
      // Install dependencies if not skipped
      if (!options.skipInstall) {
        console.log(chalk.blue('\nInstalling dependencies...\n'));
        try {
          // Check if yarn is available, otherwise use npm
          try {
            execSync('yarn --version', { stdio: 'ignore' });
            execSync('yarn', { cwd: targetDir, stdio: options.verbose ? 'inherit' : 'ignore' });
            console.log(chalk.green('\nDependencies installed successfully with yarn!'));
          } catch (e) {
            // Yarn not available, use npm
            execSync('npm install', { cwd: targetDir, stdio: options.verbose ? 'inherit' : 'ignore' });
            console.log(chalk.green('\nDependencies installed successfully with npm!'));
          }
        } catch (error) {
          console.error(chalk.yellow('\nFailed to install dependencies. You can install them manually by running:'));
          console.log(`  cd ${finalProjectName}`);
          console.log('  npm install\n');
        }
      }
      
      console.log(chalk.green(`\n✅ Created ${finalProjectName} successfully!`));
      console.log(chalk.yellow('\nNext steps:'));
      console.log(`  cd ${finalProjectName}`);
      if (options.skipInstall) {
        console.log('  npm install');
      }
      console.log('  npm start\n');
      
      console.log(chalk.blue('Happy coding! 🚀\n'));
      
    } catch (error) {
      console.error(chalk.red('Error creating project:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv);