// import React, { useState, useEffect } from "react";
// import { Link, useLocation, matchPath } from "react-router-dom";
// import MenuIcon from "@mui/icons-material/Menu";
// import ThemeToggleButton from "../../ThemeToggleButton";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Avatar from "@mui/material/Avatar";
// import CircularProgress from "@mui/material/CircularProgress";

// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

// import { useMeConfig } from "../../hooks/useFetchMeConfig";

// const navItems = [
//   { href: "/", label: "Home", icon: <HomeOutlinedIcon /> },
//   { href: "/products", label: "Products", icon: <ShoppingBagOutlinedIcon /> },
//   { href: "/support", label: "Support", icon: <SupportAgentOutlinedIcon /> },
//   { href: "/contact", label: "Contact", icon: <EmailOutlinedIcon /> },
// ];

// const Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const location = useLocation();

//   const { data } = useMeConfig();

//   if(!data) return null

  
//   useEffect(() => {
//     const image = new Image();
//     image.src = data.site_info.logo_url ;
//     image.onload = () => setIsLoading(false);
//   }, []);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const isActive = (itemPath) => {
//     const currentPath = location.pathname;
//     if (itemPath === "/") {
//       return currentPath === itemPath;
//     }
//     return currentPath.startsWith(itemPath);
//   };

  

//   const drawer = (
//     <Box onClick={handleDrawerToggle}>
//       <Typography sx={{ my: 2, marginLeft: 5 }}>Menu</Typography>
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item.label} disablePadding>
//             <ListItemButton
//               component={Link}
//               to={item.href}
//               selected={isActive(item.href)}
//               sx={{
//                 borderRadius: "0 50px 50px 0",
//                 marginRight: 1,
//               }}
//             >
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText
//                 slotProps={{
//                   primary: {
//                     fontSize: "1.2rem",
//                   },
//                 }}
//                 primary={item.label}
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );


  

//   return (
//     <AppBar position="fixed">
//       <Toolbar>
//         <Link
//           to="/"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             textDecoration: "none",
//             color: "inherit",
//             marginRight: 2,
//           }}
//         >
//           <Box sx={{ position: "relative", height: 40, width: 40, mr: 1 }}>
//             {isLoading ? (
//               <CircularProgress
//                 variant="indeterminate"
//                 disableShrink
//                 sx={{
//                   animationDuration: "1500ms",
//                   left: 0,
//                   position: "absolute",
//                   top: 0,
//                   "& .MuiCircularProgress-circle": {
//                     strokeLinecap: "round",
//                   },
//                 }}
//                 size={40}
//                 thickness={2}
//               />
//             ) : (
//               <Avatar
//                 alt={data.site_info.site_name}
//                 src={data.site_info.logo_url}
//                 sx={{
//                   width: 40,
//                   height: 40,
//                   transition: "transform 0.3s",
//                   "&:hover": { transform: "scale(1.05)" },
//                 }}
//               />
//             )}
//           </Box>
//           <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
//             {data.site_info.site_name}
//           </Typography>
//         </Link>
//         <Box sx={{ flexGrow: 1 }} />

//         <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
//           {navItems.map((item) => (
//             <Button
//               key={item.label}
//               component={Link}
//               to={item.href}
//               sx={{
//                 fontSize: "1rem",
//                 padding: "10px 15px",
//                 color: "inherit",
//                 backgroundColor: isActive(item.href)
//                   ? "rgba(0, 0, 0, 0.08)"
//                   : "transparent",
//                 "&:hover": {
//                   backgroundColor: isActive(item.href)
//                     ? "rgba(0, 0, 0, 0.12)"
//                     : "rgba(0, 0, 0, 0.08)",
//                 },
//               }}
//             >
//               {item.label}
//             </Button>
//           ))}
//         </Box>

//         <Box sx={{ display: { md: "none", marginRight: 7 } }}>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="end"
//             onClick={handleDrawerToggle}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Box>
//         <ThemeToggleButton />
//       </Toolbar>

//       <Drawer
//         anchor="left"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true,
//         }}
//         sx={{ width: "300px" }}
//       >
//         {drawer}
//       </Drawer>
//     </AppBar>
//   );
// };

// export default Navbar;

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