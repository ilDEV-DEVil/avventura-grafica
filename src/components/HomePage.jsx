import React from 'react';
import BackgroundImage from './BackgroundImage';
import gameConfig from '../config/game-config_copy.json';
import './HomePage.css';

const HomePage = ({ onStartGame }) => {
  const chapter = gameConfig.chapters[0];

  return (
    <div className="home-container">
      <BackgroundImage backgroundImage={gameConfig.homeBackground} />
      <div className="start-screen">
        <h1 className="main-title">{gameConfig.title}</h1>
        <h2 className="subtitle">{gameConfig.subtitle}</h2>
        <button className="nes-btn is-primary" onClick={onStartGame}>
          Inizia l'avventura
        </button>
      </div>
    </div>
  );
};

export default HomePage;