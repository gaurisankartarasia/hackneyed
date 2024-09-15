import React from 'react';
import { ImSpinner2 } from "react-icons/im";


import './Loader.css'; 

const Loader = () => {
  return (
    <div className="loader-container">
      <ImSpinner2 className="spinner" size={20} />
    </div>
  );
};

export default Loader;
