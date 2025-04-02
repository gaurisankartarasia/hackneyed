

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  CircularProgress
} from "@mui/material";
import {
  Menu as MenuIcon,
  HomeOutlined,
  ShoppingBagOutlined,
  SupportAgentOutlined,
  EmailOutlined
} from "@mui/icons-material";
import ThemeToggleButton from "../../ThemeToggleButton";
import { useMeConfig } from "../../hooks/useFetchMeConfig";

// Navigation items definition
const navItems = [
  { href: "/", label: "Home", icon: <HomeOutlined /> },
  { href: "/products", label: "Products", icon: <ShoppingBagOutlined /> },
  { href: "/support", label: "Support", icon: <SupportAgentOutlined /> },
  { href: "/contact", label: "Contact", icon: <EmailOutlined /> },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { data } = useMeConfig();

  useEffect(() => {
    // Preload logo image
    if (data?.site_info?.logo_url) {
      const image = new Image();
      image.src = data.site_info.logo_url;
      image.onload = () => setIsLoading(false);
    }
  }, [data]);

  // Check if a navigation item is active
  const isActive = (itemPath) => {
    if (itemPath === "/") {
      return location.pathname === itemPath;
    }
    return location.pathname.startsWith(itemPath);
  };

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  // Don't render anything if data is not available
  if (!data) return null;

  // Mobile drawer content
  const drawerContent = (
    <Box onClick={toggleDrawer}>
      <Typography sx={{ my: 2, marginLeft: 5 }}>Menu</Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.href}
              selected={isActive(item.href)}
              sx={{
                borderRadius: "0 50px 50px 0",
                marginRight: 1,
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: "1.2rem" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Logo and Site Name */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            marginRight: 2,
          }}
        >
          <Box sx={{ position: "relative", height: 40, width: 40, mr: 1 }}>
            {isLoading ? (
              <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                  animationDuration: "1500ms",
                  left: 0,
                  position: "absolute",
                  top: 0,
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "round",
                  },
                }}
                size={40}
                thickness={2}
              />
            ) : (
              <Avatar
                alt={data.site_info.site_name}
                src={data.site_info.logo_url}
                sx={{
                  width: 40,
                  height: 40,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            )}
          </Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {data.site_info.site_name}
          </Typography>
        </Link>
        
        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.href}
              sx={{
                fontSize: "1rem",
                padding: "10px 15px",
                color: "inherit",
                backgroundColor: isActive(item.href)
                  ? "rgba(0, 0, 0, 0.08)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive(item.href)
                    ? "rgba(0, 0, 0, 0.12)"
                    : "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: "block", md: "none" }, mr: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        
        {/* Theme Toggle */}
        <ThemeToggleButton />
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: "250px" } }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;