import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Clipboard, Check } from "lucide-react"

const CodeDisplay = ({ settings }) => {
  const [copied, setCopied] = useState(false);

  const code = `
import { useEffect, useRef } from 'react';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const settings = ${JSON.stringify(settings, null, 2)};

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = Array.from({ length: settings.count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * settings.speed,
      vy: (Math.random() - 0.5) * settings.speed,
    }));

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        let { x, y, vx, vy } = particle;

        switch (settings.movement) {
          case 'linear':
            x += vx;
            y += vy;
            if (x < 0 || x > canvas.width) vx = -vx;
            if (y < 0 || y > canvas.height) vy = -vy;
            break;
          case 'circular':
            const angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);
            x += Math.cos(angle) * settings.speed;
            y += Math.sin(angle) * settings.speed;
            break;
          default: // random
            x += (Math.random() - 0.5) * settings.speed;
            y += (Math.random() - 0.5) * settings.speed;
        }

        x = (x + canvas.width) % canvas.width;
        y = (y + canvas.height) % canvas.height;

        ctx.beginPath();
        ctx.fillStyle = settings.color;

        switch (settings.shape) {
          case 'square':
            ctx.rect(x - 2, y - 2, 4, 4);
            break;
          case 'triangle':
            ctx.moveTo(x, y - 2);
            ctx.lineTo(x - 2, y + 2);
            ctx.lineTo(x + 2, y + 2);
            ctx.closePath();
            break;
          default: // circle
            ctx.arc(x, y, 2, 0, Math.PI * 2);
        }

        ctx.fill();
        Object.assign(particle, { x, y, vx, vy });
      });
      animationFrameId = window.requestAnimationFrame(updateParticles);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    updateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default ParticleCanvas;
  `.trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mt-4">
      <div className="bg-gray-800 p-4 rounded-lg relative">
        <Button
          className="absolute top-2 right-2 z-10"
          onClick={copyToClipboard}
          disabled={copied}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Copied!
            </>
          ) : (
            <>
              <Clipboard className="mr-2 h-4 w-4" /> Copy Code
            </>
          )}
        </Button>
        <pre className="text-sm text-white overflow-auto max-h-[400px]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeDisplay;
