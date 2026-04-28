import React, { useState, useEffect } from 'react';
import './RiveBackground.css';

const RiveBackground = ({ animationFile }) => {
  const [riveError, setRiveError] = useState(false);
  const [RiveComponent, setRiveComponent] = useState(null);

  useEffect(() => {
    const loadRive = async () => {
      try {
        const { useRive } = await import('@rive-app/react-canvas');
        const { RiveComponent: RiveComp } = useRive({
          src: `/animations/${animationFile}`,
          autoplay: true,
          onError: () => setRiveError(true),
        });
        setRiveComponent(() => RiveComp);
        setRiveError(false);
      } catch (error) {
        console.log('File Rive non trovato, uso placeholder');
        setRiveError(true);
      }
    };

    if (animationFile) {
      loadRive();
    }
  }, [animationFile]);

  const getRandomGradient = () => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    ];
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
  };

  if (riveError || !RiveComponent || !animationFile) {
    return (
      <div 
        className="placeholder-background"
        style={{ 
          position: 'absolute', 
          width: '100%', 
          height: '100%',
          background: getRandomGradient(),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="background-pattern">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <RiveComponent 
        style={{ 
          width: '100%', 
          height: '100%',
          objectFit: 'cover'
        }} 
      />
    </div>
  );
};

export default RiveBackground;