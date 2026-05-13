import { Music2, VolumeX } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import { Slider } from "@/components/ui/slider";

export function AudioToggle() {
  const { musicEnabled, musicVolume, toggleMusic, setMusicVolume } = useAudio();

  return (
    <div className="fixed bottom-6 left-6 z-[10001] group flex items-center gap-2 pointer-events-none">
      <button
        onClick={toggleMusic}
        title={musicEnabled ? "Mute music" : "Unmute music"}
        aria-label={musicEnabled ? "Mute music" : "Unmute music"}
        className="audio-toggle-btn pointer-events-auto"
      >
        {musicEnabled ? <Music2 size={16} /> : <VolumeX size={16} />}
      </button>

      {/* Volume slider — hidden until the toggle area is hovered */}
      <div
        className="
          pointer-events-auto opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
          transition-opacity duration-300
          flex items-center
          h-[38px] px-4
          rounded-full border border-border/40
          bg-background/85 backdrop-blur-sm
          w-32
        "
      >
        <Slider
          value={[musicVolume]}
          onValueChange={(v) => setMusicVolume(v[0])}
          min={0}
          max={1}
          step={0.01}
          aria-label="Music volume"
        />
      </div>
    </div>
  );
}
