import { useState, useEffect, useCallback } from 'react';

const useParticles = (settings) => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const createParticle = useCallback((x = null, y = null) => ({
    x: x ?? Math.random() * window.innerWidth,
    y: y ?? Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * settings.speed,
    vy: (Math.random() - 0.5) * settings.speed,
  }), [settings.speed]);

  useEffect(() => {
    setParticles(Array.from({ length: settings.count }, () => createParticle()));
  }, [settings.count, createParticle]);

  useEffect(() => {
    const updateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let { x, y, vx, vy } = particle;

          switch (settings.cursorInteraction) {
            case 'follow':
              const dx = mousePosition.x - x;
              const dy = mousePosition.y - y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < 100) {
                vx += (dx / distance) * settings.speed * 0.1;
                vy += (dy / distance) * settings.speed * 0.1;
              }
              break;
            case 'repel':
              const rdx = x - mousePosition.x;
              const rdy = y - mousePosition.y;
              const rDistance = Math.sqrt(rdx * rdx + rdy * rdy);
              if (rDistance < 100) {
                vx += (rdx / rDistance) * settings.speed * 0.1;
                vy += (rdy / rDistance) * settings.speed * 0.1;
              }
              break;
            // 'inception' and 'monkey' cases are handled separately
          }

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

      // Handle 'inception' case
      if (settings.cursorInteraction === 'inception' && Math.random() < 0.1) {
        setParticles((prev) => [...prev, createParticle(mousePosition.x, mousePosition.y)]);
      }
    };

    const intervalId = setInterval(updateParticles, 16); // ~60 FPS

    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [settings, mousePosition, createParticle]);

  return { particles, mousePosition };
};

export default useParticles;
