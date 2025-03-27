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

## AI Integration

### Overview
The Sansofé Project features an intelligent assistant that enhances user experience through context-aware interactions. The assistant is designed to provide real-time information about local markets in Gran Canaria.

### Key Features

#### 🤖 Context-Aware Responses
The assistant automatically detects the user's current context:
- Market-specific information when viewing a particular market
- Municipality-focused details when browsing markets in a specific town
- General information about all markets in other contexts

#### 💡 Smart Suggestions
Pre-defined quick suggestions help users discover:
- Family-friendly markets
- Gastronomic offerings
- Weekend opening hours
- Location-based recommendations

#### 🔄 Interactive Chat Interface
```javascript
// Example of how the assistant processes context
{
  "query": "What are the opening hours?",
  "marketId": "market123",      // Automatically detected from URL
  "townId": "town456"          
}
```

### Technical Implementation

The AI assistant is implemented through:
- Real-time communication with a specialized AI endpoint
- Context extraction from URL patterns
- Error handling with user-friendly messages
- Rate limiting protection
- Responsive chat interface

<details>
<summary>Integration Example</summary>

```jsx
const handleSubmit = async () => {
  const response = await axios.post(`${baseURL}/api/ai/assistant`, {
    query: userInput,
    marketId,    // Context from current market
    townId       // Context from current town
  });
};
```
</details>

### Benefits
- 📱 **Instant Access**: Fixed position chat button for easy access
- 🎯 **Contextual Relevance**: Tailored responses based on user's location in the app
- 🔍 **Enhanced Discovery**: Helps users find specific market features and services
- 💬 **Natural Interaction**: Conversational interface for intuitive user experience

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





