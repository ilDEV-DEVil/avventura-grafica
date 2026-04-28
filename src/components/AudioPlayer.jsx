import React, { useEffect, useRef, useState } from 'react';
import './AudioPlayer.css';

const AudioPlayer = ({ musicPath, shouldPlay, volume = 0.3 }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement && musicPath) {
      audioElement.volume = volume;
      audioElement.loop = true;

      if (shouldPlay && !isPlaying) {
        audioElement.play().catch(error => {
          console.log('Autoplay prevented for audio:', error);
        });
        setIsPlaying(true);
      } else if (!shouldPlay && isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      }

      // Gestisci quando l'audio finisce (dovrebbe ricominciare con loop, ma per sicurezza)
      audioElement.addEventListener('ended', () => {
        audioElement.currentTime = 0;
        if (shouldPlay) {
          audioElement.play().catch(error => {
            console.log('Loop playback failed:', error);
          });
        }
      });

      return () => {
        audioElement.removeEventListener('ended', () => {});
      };
    }
  }, [musicPath, shouldPlay, volume, isPlaying]);

  if (!musicPath) return null;

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        preload="auto"
      >
        <source src={musicPath} type="audio/mpeg" />
        <source src={musicPath} type="audio/wav" />
        Il tuo browser non supporta l'elemento audio.
      </audio>
    </div>
  );
};

export default AudioPlayer;