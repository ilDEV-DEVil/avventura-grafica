/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import CharacterIcon from './CharacterIcon';
import DialogueSystem from './DialogueSystem';
import AudioPlayer from './AudioPlayer';
import BackgroundImage from './BackgroundImage';
import gameConfig from '../config/game-config.json';
// import gameConfig from '../config/game-config copy.json';
import './GameContainer.css';

const GameContainer = ({ onBackToHome }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentDialogues, setCurrentDialogues] = useState([]);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const chapter = gameConfig.chapters[currentChapter];
  const currentDialogue = currentDialogues[currentDialogueIndex] || null;
  const currentCharacter = currentDialogue ? gameConfig.characters[currentDialogue.character] : null;

  useEffect(() => {
    if (chapter) {
      setCurrentDialogues(chapter.dialogues);
    }
  }, [currentChapter, chapter]);

  const handleChoice = (choiceKey) => {
    if (chapter.choices && chapter.choices[choiceKey]) {
      setCurrentDialogues(chapter.choices[choiceKey]);
    }
  };

  const handleVideoStart = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  const handleNextChapter = () => {
    if (currentChapter < gameConfig.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    } else {
      // Fine del gioco
      alert('Hai completato l\'avventura!');
      setCurrentChapter(0);
      onBackToHome();
    }
  };

  const handleDialoguesComplete = () => {
    handleNextChapter();
  };

  useEffect(() => {
    if (chapter) {
      setCurrentDialogues(chapter.dialogues);
      setCurrentDialogueIndex(0);
    }
  }, [currentChapter, chapter]);

  const updateDialogueIndex = (index) => {
    setCurrentDialogueIndex(index);
  };

  

  return (
    <div className="game-container">
      <BackgroundImage backgroundImage={chapter.background} />
      <div className="game-ui">
        <div className="chapter-indicator">
          {chapter.title}
        </div>
        
        <div className="character-display-area">
          <CharacterIcon 
            characterName={currentCharacter ? currentCharacter.name : "Personaggio Principale"} 
            characterImage={currentCharacter ? currentCharacter.image : null}
          />
        </div>
        
        <DialogueSystem 
          dialogues={currentDialogues}
          onChoice={handleChoice}
          onVideoStart={handleVideoStart}
          onVideoEnd={handleVideoEnd}
          onDialoguesComplete={handleDialoguesComplete}
          onDialogueIndexChange={updateDialogueIndex}
        />
      </div>
      
      <AudioPlayer 
        musicPath={gameConfig.backgroundMusic}
        shouldPlay={true}
        volume={0.3}
      />
    </div>
  );
};

export default GameContainer;