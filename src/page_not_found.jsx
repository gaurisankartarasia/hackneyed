// src/components/PageNotFound.jsx
import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <section className='flex justify-center items-center min-h-96'>
    <div className='text-center'>
    <h1>404 - Page Not Found</h1>
    <p className='mb-5'>Oops! The page you are looking for doesn't exist.</p>
    <Button component={Link}  to="/" >Go to homepage</Button>
    <Button component={Link}  to="/products" >Go to products </Button>
    </div>
    </section>
  );
};

export default PageNotFound;