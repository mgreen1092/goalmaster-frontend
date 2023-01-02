import ReactDOM from 'react-dom/client';
import React from 'react';
import './config/firebase-config.js'
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { UserContextProvider } from './FirebaseContext/userContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);

reportWebVitals();
