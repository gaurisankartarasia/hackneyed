import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const ProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.set(0.99);

    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); 

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location]);

  return null;
};

export default ProgressBar;
