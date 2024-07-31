import { useEffect, useRef } from 'react';
import useParticles from '../hooks/useParticles';

const ParticleCanvas = ({ settings }) => {
  const canvasRef = useRef(null);
  const { particles, mousePosition } = useParticles(settings);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const drawMonkey = (x, y) => {
      ctx.fillStyle = 'brown';
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'beige';
      ctx.beginPath();
      ctx.arc(x, y + 5, 7, 0, Math.PI);
      ctx.fill();

      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(x - 4, y - 2, 2, 0, Math.PI * 2);
      ctx.arc(x + 4, y - 2, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.fillStyle = settings.color;

        switch (settings.shape) {
          case 'square':
            ctx.rect(particle.x - 2, particle.y - 2, 4, 4);
            break;
          case 'triangle':
            ctx.moveTo(particle.x, particle.y - 2);
            ctx.lineTo(particle.x - 2, particle.y + 2);
            ctx.lineTo(particle.x + 2, particle.y + 2);
            ctx.closePath();
            break;
          default: // circle
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        }

        ctx.fill();
      });

      if (settings.cursorInteraction === 'monkey') {
        drawMonkey(mousePosition.x, mousePosition.y);
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [particles, settings, mousePosition]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default ParticleCanvas;
