
// ROMWarning.jsx
import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';


const ROMWarning = ({ warnings }) => {
  if (!warnings || warnings.length === 0) return null;

  return (
    <Box sx={{ p: { xs: 0, md: 3 } }}>
      <Alert  severity="warning" sx={{  fontSize: '1rem'  }}>
        <AlertTitle>Warning</AlertTitle>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
          {warnings.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Alert>
    </Box>
  );
};

export default ROMWarning;