# Sansofe-Project-Frontend

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# SanSoFe Project Client

## Overview
The SanSoFe Project Client is a React-based frontend application designed to provide an intuitive user interface for the SanSoFe platform. This client communicates with the SanSoFe Project Server to deliver a seamless user experience.

## Features
- Responsive user interface built with React 19
- Client-side routing using React Router
- Modern UI components with Lucide React icons
- Styling with Tailwind CSS and DaisyUI
- Secure API communication with Axios

## Technology Stack
- **React**: v19.0.0 - Core frontend framework
- **React Router DOM**: v6.30.0 - For client-side routing
- **Axios**: v1.8.1 - For HTTP requests to the backend API
- **Tailwind CSS**: v3.4.17 - For utility-first styling
- **DaisyUI**: v4.12.24 - For pre-built Tailwind components
- **Lucide React**: v0.479.0 - For modern SVG icons

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm package manager
- SanSoFe Project Server running (for full functionality)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/Jojocg/Sansofe-Project-frontend.git
   cd Sansofe-Project-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   REACT_APP_SERVER_URL=http://localhost:5000 (for example)
   ```

4. Start the development server:
   ```
   npm start
   ```

5. The application will be available at `http://localhost:3000`

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Build
To create a production build:
```
npm run build
```

The build process includes a configuration for Netlify redirects to support client-side routing.

## Testing
Run tests with:
```
npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Deployed with Netlify

The project is deployed and available online. You can access it at the following link:

[Visit the live project](https://sansofe-mercados.netlify.app/)

