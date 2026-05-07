import { useState, useEffect, useRef } from "react";

// ── Dark lines (the whisperer) ───────────────────────────────────────────────
const DARK_LINES_1 = ["I see you.", "I know you.", "Still here?", "I still live.", "Give in.", "Give up."];
const DARK_LINES_2 = ["What has He done for you?", "Why fight how you feel?", "Stay a little longer.", "He abandoned you.", "I've got time. All the time in the world.", "We've been watching."];
const DARK_LINES_3 = ["You can't win.", "The Almighty doesn't answer everyone.", "I can give you power.", "Let your anger guide you.", "I can promise you power.", "The Almighty is weak... like you."];
const DARK_LINES_4 = ["Soulless you shall become.", "I shall return.", "Prove yourself to me.", "I have been waiting.", "The darkness always was.", "You are weak. Weak!", "True power comes from me."];

const DARK_POOL: Record<number, string[]> = {
  1: DARK_LINES_1,
  2: [...DARK_LINES_1, ...DARK_LINES_2],
  3: [...DARK_LINES_1, ...DARK_LINES_2, ...DARK_LINES_3, ...DARK_LINES_4],
};

// ── Light lines (the Almighty's answer) ──────────────────────────────────────
const LIGHT_LINES_1 = ["You are seen.", "Be still.", "Breathe.", "Walk on.", "Take heart.", "Look up."];
const LIGHT_LINES_2 = ["I have not left.", "You were never alone.", "I am yours and you are mine.", "Lift your eyes.", "Listen — closer.", "Let the light guide you."];
const LIGHT_LINES_3 = ["Be still and know.", "Mercy walks with you.", "You are loved.", "You are held.", "Your light is yours alone.", "Trust the way before you."];
const LIGHT_LINES_4 = ["I am with you.", "Walk where I lead.", "You were named in love.", "The morning belongs to you.", "Rise up.", "I will be your shield.", "The story is not over."];

const LIGHT_POOL: Record<number, string[]> = {
  1: LIGHT_LINES_1,
  2: [...LIGHT_LINES_1, ...LIGHT_LINES_2],
  3: [...LIGHT_LINES_1, ...LIGHT_LINES_2, ...LIGHT_LINES_3, ...LIGHT_LINES_4],
};

// ── Stage config ──────────────────────────────────────────────────────────────
// fontSize uses clamp(min, preferred-vw, max) so it's small on mobile, large on desktop
const STAGES = [
  { stage: 0, minSeconds: 0,   peakOpacity: 0,    intervalMs: Infinity, fontSize: "clamp(12px, 1vw,  18px)", holdMs: 4000, maxConcurrent: 0 },
  { stage: 1, minSeconds: 8,   peakOpacity: 0.30, intervalMs: 28000,    fontSize: "clamp(13px, 1.2vw, 22px)", holdMs: 5000, maxConcurrent: 1 },
  { stage: 2, minSeconds: 120, peakOpacity: 0.48, intervalMs: 18000,    fontSize: "clamp(14px, 1.5vw, 26px)", holdMs: 5500, maxConcurrent: 2 },
  { stage: 3, minSeconds: 600, peakOpacity: 0.65, intervalMs: 10000,    fontSize: "clamp(15px, 1.8vw, 30px)", holdMs: 6500, maxConcurrent: 2 },
];

const FADE_IN_MS  = 800;
const FADE_OUT_MS = 1600;

// ── Edge positions ────────────────────────────────────────────────────────────
const edgePos = () => {
  const edge = Math.floor(Math.random() * 4);
  const pct  = 8 + Math.random() * 74;
  switch (edge) {
    case 0:  return { x: `${pct}vw`,                     y: `${3  + Math.random() * 8}vh` };  // top
    case 1:  return { x: `${74 + Math.random() * 16}vw`, y: `${pct}vh`                    };  // right
    case 2:  return { x: `${pct}vw`,                     y: `${86 + Math.random() * 10}vh`};  // bottom
    default: return { x: `${1  + Math.random() * 10}vw`, y: `${pct}vh`                    };  // left
  }
};

// ── WhisperItem — manages its own fade lifecycle ──────────────────────────────
interface WhisperData {
  id:          number;
  text:        string;
  x:           string;
  y:           string;
  peakOpacity: number;
  fontSize:    string;
  holdMs:      number;
  hasGlow:     boolean;
}

interface VariantConfig {
  pool:               Record<number, string[]>;
  color:              string;
  glowColor:          string;
  intervalMultiplier: number;
}

function WhisperItem({ w, variant, onRemove }: { w: WhisperData; variant: VariantConfig; onRemove: (id: number) => void }) {
  const [opacity,   setOpacity]   = useState(0);
  const [blurPx,    setBlurPx]    = useState(7);
  const [fadingOut, setFadingOut] = useState(false);

  // Total alive duration drives the upward drift speed
  const totalMs = FADE_IN_MS + w.holdMs + FADE_OUT_MS;

  useEffect(() => {
    // Double rAF: first render commits initial state, second triggers transitions
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setOpacity(w.peakOpacity);
        setBlurPx(0.4);
      })
    );

    const outTimer = setTimeout(() => {
      setFadingOut(true);
      setOpacity(0);
      setBlurPx(6);
    }, FADE_IN_MS + w.holdMs);

    const removeTimer = setTimeout(() => {
      onRemove(w.id);
    }, FADE_IN_MS + w.holdMs + FADE_OUT_MS + 150);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(outTimer);
      clearTimeout(removeTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Per-character spans with staggered whisperChar wave
  const chars = w.text.split("").map((ch, i) => (
    <span
      key={i}
      style={{
        display:        "inline-block",
        animation:      `whisperChar ${1.6 + (i % 4) * 0.35}s ease-in-out infinite alternate`,
        animationDelay: `${i * 65}ms`,
      }}
    >
      {ch === " " ? " " : ch}
    </span>
  ));

  return (
    <div
      className="absolute font-body italic select-none"
      style={{
        left:          w.x,
        top:           w.y,
        fontSize:      w.fontSize,
        color:         variant.color,
        opacity,
        filter:        `blur(${blurPx}px)`,
        transition:    fadingOut
          ? `opacity ${FADE_OUT_MS}ms ease-out, filter ${FADE_OUT_MS}ms ease-out`
          : `opacity ${FADE_IN_MS}ms ease-in, filter ${FADE_IN_MS}ms ease-in`,
        animation:     `whisperRise ${totalMs}ms linear forwards`,
        letterSpacing: "0.04em",
        lineHeight:    1.5,
        whiteSpace:    "nowrap",
        textShadow:    w.hasGlow ? `0 0 20px ${variant.glowColor}` : "none",
      }}
    >
      {chars}
    </div>
  );
}

// ── Engine — variant-agnostic state machine ──────────────────────────────────
let _uid = 0;

function WhisperEngine({ variant }: { variant: VariantConfig }) {
  const [stage,    setStage]    = useState(0);
  const [whispers, setWhispers] = useState<WhisperData[]>([]);

  const secondsRef = useRef(0);
  const stageRef   = useRef(0);
  const countRef   = useRef(0);

  useEffect(() => { stageRef.current = stage; }, [stage]);

  // ── Tick ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => {
      secondsRef.current += 1;
      let next = 0;
      for (const s of STAGES) {
        if (secondsRef.current >= s.minSeconds) next = s.stage;
      }
      if (next !== stageRef.current) setStage(next);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // ── Spawn loop ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (stage === 0) return;
    const cfg = STAGES[stage];
    if (!cfg || cfg.intervalMs === Infinity) return;

    const spawn = () => {
      const live = STAGES[stageRef.current];
      if (!live || stageRef.current === 0) return;
      if (countRef.current >= live.maxConcurrent) return;

      const pool = variant.pool[stageRef.current] ?? [];
      if (!pool.length) return;

      const text   = pool[Math.floor(Math.random() * pool.length)];
      const pos    = edgePos();
      const jitter = 0.80 + Math.random() * 0.35;
      const peak   = Math.min(live.peakOpacity * jitter, 0.90);

      const w: WhisperData = {
        id:          ++_uid,
        text,
        x:           pos.x,
        y:           pos.y,
        peakOpacity: peak,
        fontSize:    live.fontSize,
        holdMs:      live.holdMs + Math.random() * 2000,
        hasGlow:     live.stage >= 3,
      };

      countRef.current += 1;
      setWhispers(prev => [...prev, w]);
    };

    spawn();
    const iv = setInterval(spawn, cfg.intervalMs * variant.intervalMultiplier);
    return () => clearInterval(iv);
  }, [stage, variant]);

  const handleRemove = (id: number) => {
    countRef.current = Math.max(0, countRef.current - 1);
    setWhispers(prev => prev.filter(w => w.id !== id));
  };

  if (!whispers.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true">
      {whispers.map(w => (
        <WhisperItem key={w.id} w={w} variant={variant} onRemove={handleRemove} />
      ))}
    </div>
  );
}

// ── Variant presets ───────────────────────────────────────────────────────────
const DARK_VARIANT: VariantConfig = {
  pool:               DARK_POOL,
  color:              "hsl(0, 72%, 55%)",
  glowColor:          "rgba(200, 40, 40, 0.5)",
  intervalMultiplier: 1.0,
};

const LIGHT_VARIANT: VariantConfig = {
  pool:               LIGHT_POOL,
  color:              "hsl(45, 80%, 92%)",
  glowColor:          "rgba(230, 195, 110, 0.55)",
  intervalMultiplier: 2.0, // half as often as dark
};

export function DarkWhisper() {
  return <WhisperEngine variant={DARK_VARIANT} />;
}

export function LightWhisper() {
  return <WhisperEngine variant={LIGHT_VARIANT} />;
}
