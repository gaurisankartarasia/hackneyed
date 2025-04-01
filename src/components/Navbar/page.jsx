
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggleButton from '../../ThemeToggleButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const navItems = [
  { href: '/', label: 'Home', icon: <HomeOutlinedIcon /> },
  { href: '/products', label: 'Products', icon: <ShoppingBagOutlinedIcon /> },
  { href: '/support', label: 'Support', icon: <SupportAgentOutlinedIcon /> },
  { href: '/contact', label: 'Contact', icon: <EmailOutlinedIcon /> },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Get the current location


  useEffect(() => {
    const image = new Image();
    image.src = 'https://firebasestorage.googleapis.com/v0/b/react-98765.appspot.com/o/assets%2Fme.jpg?alt=media&token=b955e7b3-74ae-4169-bc6c-a984a6aeab3c';
    image.onload = () => setIsLoading(false);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (href) => location.pathname === href;

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography sx={{ my: 2, marginLeft: 5 }}>
        Menu
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.href} selected={isActive(item.href)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText  primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" 
     >
      <Toolbar>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', marginRight: 2 }}>
          <Box sx={{ position: 'relative', height: 40, width: 40, mr: 1 }}>
            {isLoading ? (
              <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                  animationDuration: '1500ms',
                  left: 0,
                  position: 'absolute',
                  top: 0,
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  },
                }}
                size={40}
                thickness={2}
              />
            ) : (
              <Avatar
                alt="Me"
                src="https://firebasestorage.googleapis.com/v0/b/react-98765.appspot.com/o/assets%2Fme.jpg?alt=media&token=b955e7b3-74ae-4169-bc6c-a984a6aeab3c"
                sx={{ width: 40, height: 40, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
              />
            )}
          </Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Hackneyed
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        
      


        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.href}
              sx={{
                fontSize:'1rem',
                padding: '10px 15px',
                color: 'inherit',
                backgroundColor: isActive(item.href) ? 'rgba(0, 0, 0, 0.08)' : 'transparent', 
                '&:hover': {
                  backgroundColor: isActive(item.href) ? 'rgba(0, 0, 0, 0.12)' : 'rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        
        <Box sx={{ display: { md: 'none', marginRight:7 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <ThemeToggleButton />
      </Toolbar>
      
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{ width: '300px' }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;