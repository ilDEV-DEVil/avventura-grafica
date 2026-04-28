import React, { useState, useEffect } from 'react';
import CharacterIcon from './CharacterIcon';
import VideoPlayer from './VideoPlayer';
import gameConfig from '../config/game-config.json';
import './DialogueSystem.css';

const DialogueSystem = ({ dialogues, onChoice, onVideoStart, onVideoEnd, onDialoguesComplete, onDialogueIndexChange }) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  // Resetta l'indice quando i dialoghi cambiano
  useEffect(() => {
    setCurrentDialogueIndex(0);
  }, [dialogues]);

  useEffect(() => {
    if (onDialogueIndexChange) {
      onDialogueIndexChange(currentDialogueIndex);
    }
  }, [currentDialogueIndex, onDialogueIndexChange]);

  const currentDialogue = dialogues[currentDialogueIndex];

  useEffect(() => {
    if (currentDialogue && currentDialogue.type === 'question') {
      setShowChoices(true);
    } else if (currentDialogue && currentDialogue.type === 'video') {
      setCurrentVideo(currentDialogue.videoPath);
    } else {
      setShowChoices(false);
      setCurrentVideo(null);
    }
  }, [currentDialogue]);

  const handleNextDialogue = () => {
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      if (onDialoguesComplete) {
        onDialoguesComplete();
      }
    }
  };

  const handleChoice = (choice) => {
    if (onChoice) {
      onChoice(choice.next);
    }
  };

  const handleVideoStarted = () => {
    if (onVideoStart) {
      onVideoStart();
    }
  };

  const handleVideoEnded = () => {
    setCurrentVideo(null);
    if (onVideoEnd) {
      onVideoEnd();
    }
    handleNextDialogue();
  };

  if (!currentDialogue) {
    return null;
  }

  // Ottieni l'immagine del personaggio corrente
  const characterImage = currentDialogue && gameConfig.characters && 
    gameConfig.characters[currentDialogue.character] 
    ? gameConfig.characters[currentDialogue.character].image 
    : null;

  return (
    <div className="dialogue-container">  
      <div className="nes-container is-dark with-title">
          <p class="title">{currentDialogue.character}</p>
          <p>{currentDialogue.text}</p>
      </div>  
      
      {currentDialogue.type === 'video' && (
        <VideoPlayer 
          videoPath={currentDialogue.videoPath} 
          onStart={handleVideoStarted}
          onEnded={handleVideoEnded}
        />
      )}
      
      {showChoices && currentDialogue.choices && (
        <div className="choices-container">
          {currentDialogue.choices.map((choice, index) => (
            <button
              key={index}
              className="nes-btn is-success"
              onClick={() => handleChoice(choice)}
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}
      
      {!showChoices && !currentVideo && (
        <div>
          <button
            className="nes-btn is-primary"
            onClick={handleNextDialogue}
          >
            Avanti
          </button>
        </div>
        )}
    </div>
  );
};

export default DialogueSystem;