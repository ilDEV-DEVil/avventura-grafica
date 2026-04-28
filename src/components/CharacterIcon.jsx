import React from 'react';
import './CharacterIcon.css';

const CharacterIcon = ({ characterName, characterImage }) => {
  return (
    <div className="character-icon">
      {characterImage ? (
        <img 
          src={characterImage} 
          alt={characterName || 'Personaggio'}
          className="character-image"
        />
      ) : (
        <div className="character-icon-text">
          {characterName}
        </div>
      )}
    </div>
  );
};

export default CharacterIcon;