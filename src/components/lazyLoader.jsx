import React, { useState, useEffect, useRef } from 'react';
import Loader from '../../components/Loader';
const LazyImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); 
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <div ref={imageRef} className="relative w-full h-24 sm:h-32 rounded overflow-hidden bg-gray-100">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader size={24} color="#fff" />
        </div>
      )}
      {isVisible && (
        <img
          src={src}
          alt={alt}
          loading='lazy'
          onLoad={() => setLoaded(true)}
          className={`object-cover w-full h-full transition-opacity duration-500 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};

export default LazyImage;
