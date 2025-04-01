

import React, { useState } from 'react';
import  Fab from '@mui/material/Fab';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import FeedbackModal from './FeedbackModal';

const FloatingButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 ,   width: 30,  
          height: 30, 
          minHeight: 'auto'}}
      >
        <FeedbackOutlinedIcon fontSize='small' className='text-gray-600' />
      </Fab>
      <FeedbackModal open={open} onClose={() => setOpen(false)} />

    </>
  );
};

export default FloatingButton;
