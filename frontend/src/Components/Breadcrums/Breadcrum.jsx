import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assests/breadcrum_arrow.png';

const Breadcrum = (props) => {
  const { product } = props;
  
  if (!product) return null; 
  return (
    <div className="Breadcrum">
      HOME <img src={arrow_icon} alt="Arrow" /> SHOP <img src={arrow_icon} alt="Arrow" /> {product.category} <img src={arrow_icon} alt="Arrow" /> {product.name}
    </div>
  );
};

export default Breadcrum;