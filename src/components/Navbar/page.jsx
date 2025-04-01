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

//   const { data , error} = useMeConfig();

//   if(!data) return "error"

//   if (error) return <p>Error loading data</p>;
  
//   useEffect(() => {
//     const image = new Image();
//     image.src = data.site_info.logo_url;
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
import { Link, useLocation } from "react-router-dom"; // Removed matchPath as it wasn't used
import MenuIcon from "@mui/icons-material/Menu";
// Assuming ThemeToggleButton exists and is imported correctly
import ThemeToggleButton from "../../ThemeToggleButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

// Assuming useMeConfig hook exists and returns { data, error, isLoading }
import { useMeConfig } from "../../hooks/useFetchMeConfig";

const navItems = [
  { href: "/", label: "Home", icon: <HomeOutlinedIcon /> },
  { href: "/products", label: "Products", icon: <ShoppingBagOutlinedIcon /> },
  { href: "/support", label: "Support", icon: <SupportAgentOutlinedIcon /> },
  { href: "/contact", label: "Contact", icon: <EmailOutlinedIcon /> },
];

const Navbar = () => {
  // --- HOOKS (Must be called unconditionally at the top) ---
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoadingLogo, setIsLoadingLogo] = useState(true); // State specifically for logo image loading
  const location = useLocation();

  // Assuming useMeConfig provides its own loading state, which is common
  const { data, error, isLoading: isLoadingConfig } = useMeConfig();

  // Effect for preloading the logo image
  useEffect(() => {
    // Only try to load the image if data and the logo URL exist
    if (data?.site_info?.logo_url) {
      setIsLoadingLogo(true); // Reset loading state if data changes
      const image = new Image();
      image.src = data.site_info.logo_url;
      image.onload = () => setIsLoadingLogo(false);
      // Handle cases where the image fails to load
      image.onerror = () => {
          console.error("Failed to load logo image:", data.site_info.logo_url);
          setIsLoadingLogo(false); // Stop loading indicator even on error
      }
    } else {
      // If there's no data or no logo URL, don't show the loader
      setIsLoadingLogo(false);
    }
    // Rerun this effect if the data object changes (e.g., after fetch)
  }, [data]); // Dependency array includes 'data'

  // --- RENDER LOGIC (Conditional returns AFTER hooks) ---

  // 1. Handle loading state from the config hook
  //    (Optional: Show a full navbar loader, or just let individual parts load)
  if (isLoadingConfig) {
      // You could return a minimal loading bar here, or proceed
      // to render the structure and show loaders for specific parts.
      // Example minimal loader:
      return (
        <AppBar position="fixed">
          <Toolbar>
            <CircularProgress color="inherit" size={24} />
          </Toolbar>
        </AppBar>
      );
      // Let's proceed to render the structure for this example
  }


  // 2. Handle error state from the config hook
  if (error) {
    console.error("Error fetching site config:", error);
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography color="error">Error loading site information.</Typography>
          {/* Optionally add a retry button or more details */}
        </Toolbar>
      </AppBar>
    );
  }

  // 3. Handle case where loading is finished, no error, but data is still missing
  //    This might indicate an API issue or problem with the hook implementation.
  if (!isLoadingConfig && !error && !data) {
      return (
          <AppBar position="fixed">
              <Toolbar>
                  <Typography>Site information not available.</Typography>
              </Toolbar>
          </AppBar>
      );
  }

  // --- Component Functions and JSX (Only rendered if data is loaded) ---

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Determines if a nav link matches the current page path
  const isActive = (itemPath) => {
    const currentPath = location.pathname;
    // Exact match for the homepage
    if (itemPath === "/") {
      return currentPath === itemPath;
    }
    // StartsWith match for other sections (e.g., /products matches /products/123)
    return currentPath.startsWith(itemPath);
  };

  // Content for the mobile drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 280 }} role="presentation"> {/* Set width */}
      <Typography variant="h6" sx={{ my: 2, ml: 2, fontWeight: 'bold' }}>
         {data?.site_info?.site_name || "Menu"} {/* Use site name from data */}
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.href}
              selected={isActive(item.href)}
              sx={{
                borderRadius: "0 50px 50px 0", // Right side rounded
                marginRight: 1, // Give some space from the edge
                // Material UI's selected prop usually handles background color
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: "1rem" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // --- Main Return JSX ---
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
            marginRight: '16px', // Use theme spacing if possible theme.spacing(2)
          }}
        >
          <Box sx={{ position: "relative", height: 40, width: 40, mr: 1 }}>
            {/* Show loader while logo image is loading OR if config is still loading */}
            {(isLoadingLogo || isLoadingConfig) && !error ? (
              <CircularProgress
                variant="indeterminate"
                disableShrink
                color="inherit" // Use AppBar's color
                size={40}
                thickness={4}
                 sx={{
                   animationDuration: "1500ms",
                   position: "absolute", // Position over the avatar space
                   left: 0,
                   top: 0,
                   '& .MuiCircularProgress-circle': {
                     strokeLinecap: 'round',
                   },
                 }}
              />
            ) : (
               // Render Avatar only if data and logo URL are available
               data?.site_info?.logo_url && (
                 <Avatar
                   alt={data.site_info.site_name}
                   src={data.site_info.logo_url}
                   sx={{
                     width: 40,
                     height: 40,
                     transition: "transform 0.3s ease",
                     "&:hover": { transform: "scale(1.05)" },
                   }}
                 />
               )
            )}
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
                fontWeight: "bold",
                display: { xs: 'none', sm: 'block' } // Hide on very small screens if needed
            }}
            >
            {data?.site_info?.site_name || "Site"} {/* Fallback name */}
          </Typography>
        </Link>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.href}
              variant={isActive(item.href) ? "outlined" : "text"} // Example: highlight active
              color="inherit" // Inherit color from AppBar
              sx={{
                fontSize: "1rem",
                padding: "8px 16px", // Adjust padding
                // Use pseudo-classes or variant for background
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)' // Slight hover effect
                },
                // Example style for active link (if not using variant)
                 ...(isActive(item.href) && {
                   // backgroundColor: 'rgba(255, 255, 255, 0.12)', // Subtle background
                   // borderBottom: '2px solid currentColor', // Underline active
                 }),
              }}
            >
              {item.label}
            </Button>
          ))}
           {/* Theme Toggle on Desktop */}
           <Box sx={{ ml: 1 }}> {/* Add margin */}
                <ThemeToggleButton />
           </Box>
        </Box>

        {/* Mobile - Theme Toggle Button (Keep it consistently visible) */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}>
            <ThemeToggleButton />
        </Box>

        {/* Mobile - Hamburger Menu Icon */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end" // Position to the far right
            onClick={handleDrawerToggle}
            // sx={{ ml: 1 }} // Only add margin if needed next to theme toggle
          >
            <MenuIcon />
          </IconButton>
        </Box>


      </Toolbar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better performance if drawer is toggled often
        }}
         // Style the Drawer's Paper component
         sx={{
           '& .MuiDrawer-paper': {
             width: 280,
             boxSizing: 'border-box',
           },
         }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;