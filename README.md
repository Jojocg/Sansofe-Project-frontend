# Sansofé Project Client

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview
The Sansofe Project Client is a React-based frontend application designed to provide an intuitive user interface for the Sansofe platform. This client communicates with the [Sansofe Project Server](https://github.com/Jojocg/Sansofe-Mercados-backend) to deliver a seamless user experience.

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
- [Sansofe Project Server](https://github.com/Jojocg/Sansofe-Mercados-backend) running (for full functionality)

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

## Backend Connection
This frontend application is designed to work with the [SanSoFe Project Server](https://github.com/Jojocg/Sansofe-Mercados-backend). Make sure the backend server is running for full functionality. See the backend repository for installation and setup instructions.

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





