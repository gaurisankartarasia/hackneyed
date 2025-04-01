// // src/ThemeContext.js
// import React, { createContext, useMemo, useState, useContext } from 'react';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { lightTheme, darkTheme } from './theme';

// const ThemeContext = createContext();

// export const ThemeProviderWrapper = ({ children }) => {
//   const [mode, setMode] = useState('light');

//   const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

//   const toggleTheme = () => {
//     setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <ThemeContext.Provider value={{ mode, toggleTheme }}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </ThemeProvider>
//     </ThemeContext.Provider>
//   );
// };

// export const useThemeContext = () => useContext(ThemeContext);

// src/ThemeContext.js
import { createContext, useMemo, useState, useEffect, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./muiConfig";

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // Initialize mode from local storage, default to 'light' if not found
    const storedMode = localStorage.getItem("themeMode");
    return storedMode ? storedMode : "light";
  });

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    // Store the new mode in local storage
    localStorage.setItem("themeMode", newMode);
  };

  // Update local storage whenever the mode changes (as a fallback)
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
