import React from 'react';
import './BackgroundImage.css';

const BackgroundImage = ({ backgroundImage }) => {
  if (!backgroundImage) return null;

  return (
    <div className="background-image">
      <img 
        src={backgroundImage} 
        alt="Background" 
        className="bg-img"
      />
    </div>
  );
};

export default BackgroundImage;