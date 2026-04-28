import React, { useRef, useEffect } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoPath, onStart, onEnded }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Gestisci la fine del video
      videoElement.addEventListener('ended', () => {
        // Esce dal fullscreen quando il video finisce
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        if (onEnded) {
          onEnded();
        }
      });

      // Avvia il video e entra in fullscreen
      const playAndFullscreen = async () => {
        try {
          await videoElement.play();
          // Notifica che il video è iniziato
          if (onStart) {
            onStart();
          }
          // Richiede il fullscreen per il contenitore
          if (containerRef.current && containerRef.current.requestFullscreen) {
            await containerRef.current.requestFullscreen();
          } else if (containerRef.current && containerRef.current.webkitRequestFullscreen) {
            await containerRef.current.webkitRequestFullscreen();
          } else if (containerRef.current && containerRef.current.msRequestFullscreen) {
            await containerRef.current.msRequestFullscreen();
          }
        } catch (error) {
          console.log('Autoplay or fullscreen prevented:', error);
        }
      };

      playAndFullscreen();

      return () => {
        videoElement.removeEventListener('ended', onEnded);
      };
    }
  }, [onEnded]);

  return (
    <div 
      ref={containerRef}
      className="video-container fullscreen-video"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, backgroundColor: 'black' }}
    >
      <video
        ref={videoRef}
        controls
        width="100%"
        height="100%"
        style={{ objectFit: 'contain' }}
      >
        <source src={videoPath} type="video/mp4" />
        Il tuo browser non supporta il tag video.
      </video>
    </div>
  );
};

export default VideoPlayer;