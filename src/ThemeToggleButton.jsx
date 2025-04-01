// src/ThemeToggleButton.js
import IconButton  from '@mui/material/IconButton';
import { useThemeContext } from './ThemeContext';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === 'light' ? <LightModeOutlinedIcon fontSize='small' /> : <DarkModeOutlinedIcon fontSize='small'  />}
    </IconButton>
  );
};

export default ThemeToggleButton;
