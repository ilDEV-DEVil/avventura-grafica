import React, { useState } from 'react';
import GameContainer from './components/GameContainer';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleBackToHome = () => {
    setGameStarted(false);
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <HomePage onStartGame={handleStartGame} />
      ) : (
        <GameContainer onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}

export default App;