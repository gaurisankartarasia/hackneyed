
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AndroidIcon from '@mui/icons-material/Android';
import { SocialIconsRow } from './social_icons_front_hero'; // Assuming this path is correct

// MUI Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { keyframes } from '@mui/system'; 

// Define the floating animation
const float = keyframes`
  0% { transform: translatey(0px); }
  50% { transform: translatey(-20px); }
  100% { transform: translatey(0px); }
`;

const VivekPortfolioHero = () => {
  const navigate = useNavigate();
  const goToProducts = () => {
    navigate('/products');
  };

  const greenColor = '#4ade80'; 

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', // Adjust 64px based on your AppBar height
        display: 'flex',
        alignItems: 'center', // Center content vertically in the Box
        position: 'relative', // Needed for absolute positioning of the icon
        overflow: 'hidden', // Hide overflow
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Change to row starting from 'md'
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative', // Relative positioning context for children
          zIndex: 1,
          gap: { xs: 4, md: 6 }, // Add gap between text and icon columns on medium+ screens
        }}
      >
        {/* Text Content */}
        <Box
          sx={{
            maxWidth: { xs: '100%', md: '55%' }, // Take full width on small, adjust on medium+
            textAlign: { xs: 'center', md: 'left' }, // Center on small, left-align medium+
            zIndex: 2, // Ensure text is above the icon
            order: { xs: 2, md: 1 }, // Ensure text comes first in the row layout on medium+ screens
          }}
        >
          <Typography
            variant="h6"
            component="h2" // Use h2 for semantic structure if h1 is main heading
            sx={{
              color: greenColor,
              mb: 1,
              fontWeight: 'medium',
            }}
          >
            Hey, this is
          </Typography>
          <Typography
            variant="h1"
            component="h1" // Main heading
            sx={{
              fontWeight: 'bold',
              mb: { xs: 3, sm: 4 },
              letterSpacing: '-0.05em',
              fontSize: {
                xs: '3rem',    // text-4xl
                sm: '3.75rem', // text-5xl
                md: '4rem',    // Slightly smaller for md to fit icon
                lg: '5rem',    // text-8xl approximation
              },
              lineHeight: 1.1,
            }}
          >
            VIVEK
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: { xs: 4, sm: 5 },
              fontSize: { xs: '1rem', sm: '1.125rem', lg: '1.25rem' },
              lineHeight: 1.6,
              maxWidth: '65ch', // Slightly increased max width for readability
              mx: { xs: 'auto', md: 0 }, // Center text block on small, align left medium+
            }}
          >
            Tired of your phone feeling like a factory-made cookie-cutter? I'm here to spice things up! I create custom ROMs and kernels that let you unlock your phone's true potential. Think faster, smoother, and more personalized.
          </Typography>
          <Button
            onClick={goToProducts}
            variant='contained'
            size="large"
            sx={{ mb: 4, bgcolor:greenColor }}
          >
            View my works
          </Button>

          {/* Social Icons - Ensure it has appropriate styling within its component */}
           {/* Wrap SocialIconsRow in a Box for alignment control */}
           <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
             <SocialIconsRow />
           </Box>
        </Box>

        {/* Android Icon */}
        <Box
          sx={{
            color: greenColor,
            animation: `${float} 6s ease-in-out infinite`,
            // --- Visibility Fix ---
            // Show the icon from 'md' screens upwards. Hide on 'xs' and 'sm'.
            // Adjust 'md' to 'xs' if you want it visible (but potentially smaller) on all screens.
            alignItems: 'center',
            justifyContent: 'center',
            // --- Layout Fix: Changed from absolute positioning ---
            // Now it's part of the flex flow defined in the Container
            position: 'relative', // No longer absolute
            width: { md: '40%', lg: '45%' }, // Take up remaining space in flex row
            maxWidth: '500px', // Max width to prevent it getting too huge
            height: 'auto',    // Maintain aspect ratio
            zIndex: 0,
            opacity: 0.7, // Slightly increased opacity
            order: { xs: 1, md: 2 }, // Ensure icon comes second in row layout on medium+
            mt: { xs: 4, md: 0 }, // Add margin top on small screens when it's stacked
            '& .android-icon': {
              // --- Sizing Fix: Use responsive rem units ---
              // Use rem or fixed pixels instead of vh for more predictable sizing
              width: '100%', // Icon fills its container Box
              height: 'auto', // Maintain aspect ratio
            }
          }}
        >
          {/* Ensure the icon itself scales well */}
          <AndroidIcon
             className="android-icon"
             sx={{
               
               fontSize: { md: '20rem', lg: '25rem', xl: '30rem' } // Adjust sizes as needed
             }}
           />
        </Box>
      </Container>
    </Box>
  );
};

export default VivekPortfolioHero;