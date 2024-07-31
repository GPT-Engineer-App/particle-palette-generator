import { useState } from 'react';
import ParticleControls from '../components/ParticleControls';
import ParticleCanvas from '../components/ParticleCanvas';
import CodeDisplay from '../components/CodeDisplay';

const Index = () => {
  const [particleSettings, setParticleSettings] = useState({
    count: 100,
    speed: 1,
    movement: 'random',
    shape: 'circle',
    color: '#ffffff',
    cursorInteraction: 'none',
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div className="w-1/4 p-4 bg-gray-100 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Particle Generator</h1>
          <ParticleControls
            settings={particleSettings}
            onSettingsChange={setParticleSettings}
          />
          <CodeDisplay settings={particleSettings} />
        </div>
        <div className="w-3/4 bg-gray-900">
          <ParticleCanvas settings={particleSettings} />
        </div>
      </div>
    </div>
  );
};

export default Index;
