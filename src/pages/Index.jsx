import { useState } from 'react';
import ParticleControls from '../components/ParticleControls';
import ParticleCanvas from '../components/ParticleCanvas';

const Index = () => {
  const [particleSettings, setParticleSettings] = useState({
    count: 100,
    speed: 1,
    movement: 'random',
    shape: 'circle',
    color: '#ffffff',
  });

  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Particle Generator</h1>
        <ParticleControls
          settings={particleSettings}
          onSettingsChange={setParticleSettings}
        />
      </div>
      <div className="w-3/4 bg-gray-900">
        <ParticleCanvas settings={particleSettings} />
      </div>
    </div>
  );
};

export default Index;
