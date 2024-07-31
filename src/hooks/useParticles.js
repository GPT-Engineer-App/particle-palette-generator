import { useState, useEffect } from 'react';

const useParticles = (settings) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createParticle = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * settings.speed,
      vy: (Math.random() - 0.5) * settings.speed,
    });

    setParticles(Array.from({ length: settings.count }, createParticle));

    const updateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let { x, y, vx, vy } = particle;

          switch (settings.movement) {
            case 'linear':
              x += vx;
              y += vy;
              break;
            case 'circular':
              const angle = Math.atan2(y - window.innerHeight / 2, x - window.innerWidth / 2);
              x += Math.cos(angle) * settings.speed;
              y += Math.sin(angle) * settings.speed;
              break;
            default: // random
              x += (Math.random() - 0.5) * settings.speed;
              y += (Math.random() - 0.5) * settings.speed;
          }

          // Wrap around the screen
          x = (x + window.innerWidth) % window.innerWidth;
          y = (y + window.innerHeight) % window.innerHeight;

          return { x, y, vx, vy };
        })
      );
    };

    const intervalId = setInterval(updateParticles, 16); // ~60 FPS

    return () => clearInterval(intervalId);
  }, [settings]);

  return particles;
};

export default useParticles;
