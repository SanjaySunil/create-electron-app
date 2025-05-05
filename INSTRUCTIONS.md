# Create Electron App

`new-electron-app` is an npm package that allows you to quickly scaffold a minimal Electron app template. You can choose between a standard React setup or a Vite-based setup.

## Installation

To install the package globally, run:

```bash
npm install -g new-electron-app
```

## Usage

Run the following command to create a new Electron app:

```bash
new-electron-app <project-name>
```

### Options

During the setup process, you will be prompted to choose between the following options:

1. **React**: A standard React-based Electron app.
2. **Vite**: A Vite-based Electron app for faster builds and modern tooling.

## Example

To create a new Electron app named `my-electron-app`:

```bash
new-electron-app my-electron-app
```

Follow the prompts to select your preferred template (React or Vite). The necessary files and configurations will be generated automatically.

## Features

- Minimal Electron app setup.
- Choose between React and Vite templates.
- Pre-configured scripts for development and production builds.

## Development

After creating your app, navigate to the project directory:

```bash
cd <project-name>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

## Build for Production

To build your app for production, run:

```bash
npm run build
```

This will generate the production-ready files in the `dist` directory.

## Feedback and Contributions

Feel free to open issues or contribute to the project on GitHub. Your feedback is appreciated!
