// src/theme.js
import { createTheme } from '@mui/material/styles';

const typography = {
  fontFamily: 'SUSE, sans-serif',
  button: {
    textTransform: 'none',
  },
};

const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '50px',
        padding: '10px 30px',
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
      },
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({ 
        width: 250,
        boxShadow: theme.shadows[2], 
         borderTopRightRadius:'20px', borderBottomRightRadius:'20px',
        backgroundColor: theme.palette.mode === 'dark' ? '#282a2c' : '#f0f4f9',
        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.87)',
      }),
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({ 
        borderRadius:7,
        boxShadow: theme.shadows[2], 
        backgroundColor: theme.palette.mode === 'dark' ? '#282a2c' : '#f0f4f9',
        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.87)',
      }),
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({ 
        backgroundColor: theme.palette.mode === 'dark' ? '#030915' : '#fff',
        color: theme.palette.mode === 'dark' ? '#fff' : '#4f5251',
        boxShadow:'none',
        borderBottom: true,
      }),
    },
  },

  MuiAlert:{
    styleOverrides:{
      root:{
        borderRadius:14
      }
    }
  },

  
};

// Light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0b57d0',
    },
    background: {
      default: '#fff',
      paper: '#f0f4f9',
    },
    text: {
      primary: '#000',
      secondary: '#555555',
    },
  },
  typography,
  components,
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a8c7fa',
    },
    background: {
      default: '#000',
      paper: '#030915', 
    },
    text: {
      primary: '#fff',
      secondary: '#bbbbbb',
    },
  },
  typography,
  components,
});

export { lightTheme, darkTheme };
