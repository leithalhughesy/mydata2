// src/context/ThemeContext.js
import React, { createContext, useState } from 'react';
import { lightTheme, darkTheme } from '../theme'; // adjust the path as necessary

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme); // default to dark theme

  // Function to update the theme
  const updateTheme = (newThemeTitle) => {
    setTheme(newThemeTitle === 'light' ? lightTheme : darkTheme);
  };

    // Load theme settings from Firebase on mount
    // ... Firebase logic here ...

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
