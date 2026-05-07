import { Music2, VolumeX, Volume2, MicOff } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

export function AudioToggle() {
  const { musicEnabled, sfxEnabled, toggleMusic, toggleSfx } = useAudio();

  return (
    <div className="fixed bottom-6 left-6 z-[10001] flex flex-col gap-2 pointer-events-none items-start">
      <button
        onClick={toggleMusic}
        title={musicEnabled ? "Mute music" : "Unmute music"}
        aria-label={musicEnabled ? "Mute music" : "Unmute music"}
        className="audio-toggle-btn pointer-events-auto"
      >
        {musicEnabled ? <Music2 size={16} /> : <VolumeX size={16} />}
      </button>
      <button
        onClick={toggleSfx}
        title={sfxEnabled ? "Mute sound effects" : "Unmute sound effects"}
        aria-label={sfxEnabled ? "Mute sound effects" : "Unmute sound effects"}
        className="audio-toggle-btn pointer-events-auto"
      >
        {sfxEnabled ? <Volume2 size={16} /> : <MicOff size={16} />}
      </button>
    </div>
  );
}
