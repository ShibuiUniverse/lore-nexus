import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from "react";

const KEY_MUSIC = "lorekeeper-music-on";
const KEY_SFX   = "lorekeeper-sfx-on";

const readBool = (key: string, fallback: boolean): boolean => {
  if (typeof window === "undefined") return fallback;
  const v = localStorage.getItem(key);
  return v === null ? fallback : v === "1";
};
const writeBool = (key: string, value: boolean) => {
  try { localStorage.setItem(key, value ? "1" : "0"); } catch {}
};

interface MusicOpts {
  loop?: boolean;
  volume?: number;       // 0-1
  fadeInMs?: number;
}

interface SfxOpts {
  volume?: number;       // 0-1
}

interface AudioContextValue {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  /** True when music is enabled but autoplay was blocked — UI can show a "click to enable sound" cue */
  audioBlocked: boolean;
  toggleMusic: () => void;
  toggleSfx: () => void;
  playMusic: (src: string, opts?: MusicOpts) => void;
  stopMusic: (fadeOutMs?: number) => void;
  playSfx: (src: string, opts?: SfxOpts) => void;
  /** Start fetching + decoding a music file in the background so playMusic is instant on click. */
  preloadMusic: (src: string) => Promise<void>;
  /** Spin up the Web Audio context now (needs user gesture) so later playback has no startup latency. */
  prewarmAudio: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [musicEnabled, setMusicEnabled] = useState(() => readBool(KEY_MUSIC, true));
  const [sfxEnabled, setSfxEnabled] = useState(() => readBool(KEY_SFX, true));
  const [audioBlocked, setAudioBlocked] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicBufferRef = useRef<Map<string, AudioBuffer>>(new Map());
  const musicSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const musicTargetVolumeRef = useRef<number>(0.5);

  // Create the AudioContext up front (suspended is fine — decoding works without a gesture)
  useEffect(() => {
    if (!audioCtxRef.current) {
      try {
        const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new Ctor({ latencyHint: "interactive" });
      } catch {
        // older browsers without Web Audio support — toggle UI still renders, just silent
      }
    }
    return () => {
      try { audioCtxRef.current?.close(); } catch {}
      audioCtxRef.current = null;
    };
  }, []);

  // Persist toggles
  useEffect(() => writeBool(KEY_MUSIC, musicEnabled), [musicEnabled]);
  useEffect(() => writeBool(KEY_SFX, sfxEnabled), [sfxEnabled]);

  // Update the music gain when the toggle flips (smooth ramp via Web Audio)
  useEffect(() => {
    const ctx = audioCtxRef.current;
    const gain = musicGainRef.current;
    if (!ctx || !gain) return;
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    const target = musicEnabled ? musicTargetVolumeRef.current : 0;
    gain.gain.linearRampToValueAtTime(target, now + 0.3);
  }, [musicEnabled]);

  // Fetch + decode a music file into an AudioBuffer so playMusic is instant on click.
  // Web Audio buffer playback has ~10ms latency vs ~200-500ms for HTMLAudioElement.
  const preloadMusic = useCallback(async (src: string) => {
    if (musicBufferRef.current.has(src)) return;
    if (!audioCtxRef.current) return;
    try {
      const res = await fetch(src);
      const arrBuf = await res.arrayBuffer();
      const audioBuf = await audioCtxRef.current.decodeAudioData(arrBuf);
      musicBufferRef.current.set(src, audioBuf);
    } catch {
      // file missing or undecodable — playMusic will fall through quietly
    }
  }, []);

  // Resume the AudioContext on a user gesture so later playback fires with no cold-start.
  const prewarmAudio = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    // Tiny silent buffer to nudge the audio thread fully alive
    try {
      const silentBuf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = silentBuf;
      src.connect(ctx.destination);
      src.start(0);
    } catch {
      // non-fatal
    }
  }, []);

  // Play music via Web Audio BufferSource — sample-accurate, low latency.
  // Caller should preloadMusic first; if not, this will preload then retry once.
  // Must be called within a user gesture for the context to actually output sound.
  const playMusic = useCallback((src: string, opts: MusicOpts = {}) => {
    const { loop = true, volume = 0.7, fadeInMs = 0 } = opts;
    musicTargetVolumeRef.current = volume;

    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    if (musicSourceRef.current) {
      try { musicSourceRef.current.stop(); } catch {}
      musicSourceRef.current = null;
    }

    const buffer = musicBufferRef.current.get(src);
    if (!buffer) {
      preloadMusic(src).then(() => {
        if (musicBufferRef.current.has(src)) playMusic(src, opts);
      });
      return;
    }

    setAudioBlocked(false);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;

    const gain = ctx.createGain();
    gain.gain.value = fadeInMs > 0 ? 0 : (musicEnabled ? volume : 0);
    if (fadeInMs > 0) {
      const now = ctx.currentTime;
      gain.gain.linearRampToValueAtTime(musicEnabled ? volume : 0, now + fadeInMs / 1000);
    }

    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(0);

    musicSourceRef.current = source;
    musicGainRef.current = gain;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicEnabled]);

  const stopMusic = useCallback((fadeOutMs: number = 0) => {
    const source = musicSourceRef.current;
    const gain = musicGainRef.current;
    const ctx = audioCtxRef.current;
    if (!source) return;

    if (fadeOutMs <= 0 || !ctx || !gain) {
      try { source.stop(); } catch {}
      musicSourceRef.current = null;
      musicGainRef.current = null;
      return;
    }

    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0, now + fadeOutMs / 1000);
    setTimeout(() => {
      try { source.stop(); } catch {}
      if (musicSourceRef.current === source) {
        musicSourceRef.current = null;
        musicGainRef.current = null;
      }
    }, fadeOutMs + 30);
  }, []);

  // Generic short-form sfx player — for one-shot UI sounds (hover ticks, modal chimes, etc.)
  const playSfx = useCallback((src: string, opts: SfxOpts = {}) => {
    if (!sfxEnabled) return;
    const { volume = 0.7 } = opts;
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(() => { /* autoplay blocked, ignore */ });
  }, [sfxEnabled]);

  const value: AudioContextValue = {
    musicEnabled,
    sfxEnabled,
    audioBlocked,
    toggleMusic: () => setMusicEnabled((v) => !v),
    toggleSfx: () => setSfxEnabled((v) => !v),
    playMusic,
    stopMusic,
    playSfx,
    preloadMusic,
    prewarmAudio,
  };

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
