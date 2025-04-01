

import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';

import { useMeConfig } from "../../../hooks/useFetchMeConfig";

const CompactCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1),
  '& .MuiCardContent-root': {
    padding: theme.spacing(1),
    '& .MuiTypography-h5': {
      fontSize: theme.typography.pxToRem(16),
      marginBottom: theme.spacing(0.5),
    },
    '& .MuiTypography-body2': {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 1.2,
    },
  },
  '& .MuiCardActions-root': {
    padding: theme.spacing(0.5),
    justifyContent: 'flex-end',
  },
  '& .MuiButton-root': {
    fontSize: theme.typography.pxToRem(12),
    padding: theme.spacing(0.5, 1),
  },
}));

export const DonateMeCard = () => {
  const { data, error, isLoading } = useMeConfig();

  if (isLoading) return <Box sx={{ fontSize: '0.8rem' }}>Loading...</Box>;
  if (error) return <Box sx={{ fontSize: '0.8rem', color: 'error.main' }}>Error</Box>;

  return (
    <CompactCard>
      <CardContent>
        
        <Typography variant="body2" color="text.secondary" noWrap>
          {data?.donate_card?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={data?.donate_card?.payment_link} target="_blank" rel="noopener noreferrer">
          Donate
        </Button>
      </CardActions>
    </CompactCard>
  );
};