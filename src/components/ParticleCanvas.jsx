import { useEffect, useRef } from 'react';
import useParticles from '../hooks/useParticles';

const ParticleCanvas = ({ settings }) => {
  const canvasRef = useRef(null);
  const particles = useParticles(settings);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
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
      animationFrameId = window.requestAnimationFrame(render);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [particles, settings]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default ParticleCanvas;
