import ReactDOM from 'react-dom/client';
import React from 'react';
import './config/firebase-config.js'
import './index.css';
import App from './App.js';
// import reportWebVitals from './reportWebVitals.js';
import './config/firebase-config.js'
// import { BrowserRouter as Router } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <Router>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    // </Router>
  // </React.StrictMode>
);

// reportWebVitals();
