import React from 'react';
import { createRoot } from 'react-dom/client'; // updated import
import './index.css'; // or the name of your main CSS file
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // create a root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);