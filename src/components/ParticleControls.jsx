import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const ParticleControls = ({ settings, onSettingsChange }) => {
  const handleChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="count">Number of Particles</Label>
        <Slider
          id="count"
          min={1}
          max={1000}
          step={1}
          value={[settings.count]}
          onValueChange={([value]) => handleChange('count', value)}
        />
        <span className="text-sm">{settings.count}</span>
      </div>

      <div>
        <Label htmlFor="speed">Speed</Label>
        <Slider
          id="speed"
          min={0.1}
          max={5}
          step={0.1}
          value={[settings.speed]}
          onValueChange={([value]) => handleChange('speed', value)}
        />
        <span className="text-sm">{settings.speed.toFixed(1)}</span>
      </div>

      <div>
        <Label htmlFor="movement">Movement Type</Label>
        <Select value={settings.movement} onValueChange={(value) => handleChange('movement', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select movement type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="random">Random</SelectItem>
            <SelectItem value="linear">Linear</SelectItem>
            <SelectItem value="circular">Circular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="shape">Particle Shape</Label>
        <Select value={settings.shape} onValueChange={(value) => handleChange('shape', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select particle shape" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="circle">Circle</SelectItem>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="triangle">Triangle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="color">Color</Label>
        <Input
          id="color"
          type="color"
          value={settings.color}
          onChange={(e) => handleChange('color', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="mouseReactive"
          checked={settings.mouseReactive}
          onCheckedChange={(checked) => handleChange('mouseReactive', checked)}
        />
        <Label htmlFor="mouseReactive">React to mouse movement</Label>
      </div>
    </div>
  );
};

export default ParticleControls;
