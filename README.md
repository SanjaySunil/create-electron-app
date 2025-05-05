# new-electron-app

A CLI tool to quickly generate Electron applications with either React or Vite templates.

![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)

## Overview

`new-electron-app` is a command-line tool that helps you jumpstart your Electron development by providing pre-configured templates with either React or Vite. It takes care of all the setup so you can focus on building your application.

## Installation

You can use this package in two ways:

### Global Installation

```bash
npm install -g new-electron-app
```

Then you can create a new app anywhere:

```bash
new-electron-app my-electron-app
```

### Using npx

You can also use it directly with npx without installing:

```bash
npx new-electron-app my-electron-app
```

## Features

- 🚀 Quick scaffolding of Electron applications
- 🎭 Choose between React or Vite templates
- ⚙️ Pre-configured for development and production
- 📦 Complete build setup with electron-builder
- 🛠 Hot Module Replacement for fast development

## Usage

```bash
new-electron-app [project-name] [options]
```

If you don't provide a project name, you'll be prompted for one.

### Options

- `--skip-install`: Skip installing dependencies
- `--verbose`: Print additional logs
- `--typescript`: Use TypeScript template (coming soon)

## Templates

### React Template

- React 18 with create-react-app configuration
- Electron integrated with development server
- Hot reloading for React components
- Production build setup with electron-builder

### Vite Template

- React 18 with Vite for faster development
- HMR (Hot Module Replacement) for even quicker development cycles
- Optimized build process
- Production build setup with electron-builder

## Scripts

Both templates include the following npm scripts:

- `npm start`: Start the application in development mode
- `npm run build`: Build the application for production

## Project Structure

### React Template
```
my-electron-app/
├── node_modules/
├── public/
│   ├── electron.js    # Main Electron process
│   └── index.html     # HTML template
├── src/
│   ├── App.css        # Application styles
│   ├── App.js         # Main React component
│   ├── index.css      # Global styles
│   └── index.js       # React entry point
├── package.json       # Project dependencies and scripts
└── .gitignore         # Git ignore rules
```

### Vite Template
```
my-electron-app/
├── node_modules/
├── dist/              # Built files (after build)
├── src/
│   ├── App.css        # Application styles
│   ├── App.jsx        # Main React component
│   ├── index.css      # Global styles
│   └── main.jsx       # React entry point
├── electron.js        # Main Electron process
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
├── package.json       # Project dependencies and scripts
└── .gitignore         # Git ignore rules
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Electron
- React
- Vite
- electron-builder