
import React from 'react';
import { Link } from 'react-router-dom';
import AndroidIcon from '@mui/icons-material/Android';
import { SocialIconsRow } from './social_icons_front_hero'; 

import { useMeConfig } from "../../hooks/useFetchMeConfig";


import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { keyframes } from '@mui/system'; 

const float = keyframes`
  0% { transform: translatey(0px); }
  50% { transform: translatey(-20px); }
  100% { transform: translatey(0px); }
`;

const VivekPortfolioHero = () => {

   const { data } = useMeConfig();

    if (!data) return 

  const greenColor = '#4ade80'; 

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', 
        display: 'flex',
        alignItems: 'center', 
        position: 'relative', 
        overflow: 'hidden', 
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative', 
          zIndex: 1,
          gap: { xs: 4, md: 6 }, 
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: '100%', md: '55%' }, 
            textAlign: { xs: 'center', md: 'left' }, 
            zIndex: 2, 
            order: { xs: 2, md: 1 }, 
          }}
        >
          <Typography
            variant="h6"
            component="h2" 
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
            component="h1" 
            sx={{
              fontWeight: 'bold',
              mb: { xs: 3, sm: 4 },
              letterSpacing: '-0.05em',
              fontSize: {
                xs: '3rem',    
                sm: '3.75rem', 
                md: '4rem',   
                lg: '5rem',   
              },
              lineHeight: 1.1,
            }}
          >
            {data.site_info.front_name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: { xs: 4, sm: 5 },
              fontSize: { xs: '1rem', sm: '1.125rem', lg: '1.25rem' },
              lineHeight: 1.6,
              maxWidth: '65ch', 
              mx: { xs: 'auto', md: 0 }, 
            }}
          >
            {data.site_info.front_description}
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant='contained'
            size="large"
            sx={{ mb: 4, bgcolor:greenColor }}
          >
            View my works
          </Button>

           <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
             <SocialIconsRow />
           </Box>
        </Box>

        <Box
          sx={{
            color: greenColor,
            animation: `${float} 6s ease-in-out infinite`,
    
            alignItems: 'center',
            justifyContent: 'center',
      
            position: 'relative',
            width: { md: '40%', lg: '45%' }, 
            maxWidth: '500px', 
            height: 'auto',   
            zIndex: 0,
            opacity: 0.7, 
            order: { xs: 1, md: 2 }, 
            mt: { xs: 4, md: 0 }, 
            '& .android-icon': {
          
              width: '100%',
              height: 'auto',
            }
          }}
        >
          <AndroidIcon
             className="android-icon"
             sx={{
               
               fontSize: { md: '20rem', lg: '25rem', xl: '30rem' } 
             }}
           />
        </Box>
      </Container>
    </Box>
  );
};

export default VivekPortfolioHero;