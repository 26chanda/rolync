import React from 'react';
import ReactDOM from 'react-dom/client'; // Update the import for ReactDOM
import './index.css';
import App from './App.js'; // Add .js extension
import reportWebVitals from './reportWebVitals.js'; // Add .js extension
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import { store } from './store/store.js';

// Use createRoot for React 18+
const root = ReactDOM.createRoot(document.getElementById('root')); // Create root for React 18
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
