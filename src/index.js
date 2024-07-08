import React from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>
);
