// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ThemeProvider> {/* Wrap App with ThemeProvider */}
    <App />
  </ThemeProvider>
);
