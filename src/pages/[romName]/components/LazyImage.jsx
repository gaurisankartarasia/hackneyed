import  { useState } from "react";
import PropTypes from 'prop-types';

const LazyImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative lg:w-[500px] h-full bg-gray-200 rounded-3xl ">
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-3xl transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default LazyImage;
