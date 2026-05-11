import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useAudio } from "@/contexts/AudioContext";

// Phased reveal:
//   1: 伝 begins fading in
//   2: 承 begins fading in
//   3: kanji settled — breathing pulse + separator draws
//   4: title cascades in letter by letter
//   5: tagline + "Enter the Keep" button revealed (waits for user)
//   6: katana slash — flash + halves slide apart, revealing homepage
const TIMINGS = {
  kanji1:    200,
  kanji2:    1600,
  separator: 3600,
  title:     4000,
  tagline:   5000,
};
const EXIT_DURATION_MS = 1400;  // slash trigger → onComplete

const TITLE = "THE LOREKEEPER";
const TITLE_LETTER_STAGGER_MS = 80;

// Slash geometry — diagonal cut from upper-right area to lower-left
// Two halves, clipped to share the slash edge perfectly
const LEFT_HALF_CLIP  = "polygon(0% 0%, 55% 0%, 45% 100%, 0% 100%)";
const RIGHT_HALF_CLIP = "polygon(55% 0%, 100% 0%, 100% 100%, 45% 100%)";

// Pre-generate ember positions
const EMBERS = Array.from({ length: 14 }, () => ({
  left:     Math.random() * 100,
  size:     2 + Math.random() * 3,
  duration: 7 + Math.random() * 6,
  delay:    Math.random() * 8,
  hueShift: -10 + Math.random() * 25,
}));

interface Props {
  onComplete: () => void;
}

export function CinematicLoader({ onComplete }: Props) {
  const [phase, setPhase] = useState(0);
  const [started, setStarted] = useState(false);    // splash gate cleared, cinematic begins
  const [splashReady, setSplashReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { playMusic, stopMusic, preloadMusic, prewarmAudio, audioBlocked, musicEnabled } = useAudio();

  const enter = useCallback(() => {
    setPhase((p) => (p >= 6 ? p : 6));
    stopMusic(300);      // fast fade with the slash
    // Hand off to ambient site music once the intro has cleared
    setTimeout(() => {
      playMusic("/audio/whispers-of-baransu.mp3", { loop: true, volume: 0.45, fadeInMs: 1500 });
    }, 350);
    setTimeout(onComplete, EXIT_DURATION_MS);
  }, [onComplete, stopMusic, playMusic]);

  const beginShow = useCallback(() => {
    prewarmAudio();
    // Start music synchronously inside the click handler — preserves user activation
    // and avoids the extra frame of delay from useEffect commit.
    playMusic("/audio/intro.mp3", { loop: true, volume: 0.7, fadeInMs: 0 });
    // Stop the splash video so it doesn't keep decoding in the background
    if (videoRef.current) {
      try { videoRef.current.pause(); } catch {}
    }
    setStarted((s) => s || true);
  }, [prewarmAudio, playMusic]);

  // Splash fades in on mount + start downloading the music file in the background
  useEffect(() => {
    preloadMusic("/audio/intro.mp3");
    preloadMusic("/audio/whispers-of-baransu.mp3");
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setSplashReady(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // While on splash, listen for keyboard begin (Enter/Space)
  useEffect(() => {
    if (started) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") beginShow();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, beginShow]);

  // Once started: phased cinematic timers + skip-key listener
  // (Music is started synchronously in beginShow for lowest latency)
  useEffect(() => {
    if (!started) return;

    const timers = [
      setTimeout(() => setPhase(1), TIMINGS.kanji1),
      setTimeout(() => setPhase(2), TIMINGS.kanji2),
      setTimeout(() => setPhase(3), TIMINGS.separator),
      setTimeout(() => setPhase(4), TIMINGS.title),
      setTimeout(() => setPhase(5), TIMINGS.tagline),
    ];

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") enter();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const titleChars = useMemo(
    () =>
      TITLE.split("").map((ch, i) => ({
        ch,
        key: `${i}-${ch}`,
        delay: i * TITLE_LETTER_STAGGER_MS,
      })),
    []
  );

  const exiting = phase >= 6;

  const kanjiBase = {
    fontFamily: "'Yu Mincho', 'Hiragino Mincho Pro', 'Noto Serif JP', serif",
    fontSize: "clamp(96px, 14vw, 200px)",
    fontWeight: 400,
    lineHeight: 1,
    color: "hsl(38, 60%, 62%)",
    letterSpacing: "0.05em",
    transition: "opacity 2.4s ease-out, filter 2.4s ease-out, transform 2.4s ease-out",
    display: "inline-block",
  } as const;

  const halfBase = {
    position: "absolute" as const,
    inset: 0,
    backgroundColor: "hsl(30, 15%, 4%)",
    transition: "transform 1100ms cubic-bezier(0.55, 0, 0.2, 1) 200ms",
    willChange: "transform",
  };

  return (
    <div
      onClick={!started ? beginShow : undefined}
      className="fixed inset-0 z-[10000] overflow-hidden"
      style={{ cursor: !started ? "pointer" : "default" }}
      aria-hidden="true"
    >
      {/* ── Two dark halves clipped along the slash diagonal ── */}
      {/* During phases 1-5 they sit at translate(0,0) and look like one solid bg.
          On phase 6 they slide apart in opposite directions like a katana cut. */}
      <div
        style={{
          ...halfBase,
          clipPath: LEFT_HALF_CLIP,
          transform: exiting ? "translate(-110vw, -4vh) rotate(-1.5deg)" : "translate(0, 0)",
        }}
      />
      <div
        style={{
          ...halfBase,
          clipPath: RIGHT_HALF_CLIP,
          transform: exiting ? "translate(110vw, 4vh) rotate(1.5deg)" : "translate(0, 0)",
        }}
      />

      {/* ── Decorative overlays — fade out fast when slash hits ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(30, 15%, 8%) 0%, transparent 70%)",
          opacity: exiting ? 0 : 1,
          transition: "opacity 250ms ease-out",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(220, 180, 80, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(180, 40, 40, 0.03) 0%, transparent 50%)",
          opacity: exiting ? 0 : 1,
          transition: "opacity 250ms ease-out",
        }}
      />

      {/* ── Drifting gold embers — fade out fast when slash hits ── */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          opacity: exiting ? 0 : 1,
          transition: "opacity 250ms ease-out",
        }}
      >
        {EMBERS.map((e, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              bottom: "-10px",
              left: `${e.left}vw`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              borderRadius: "50%",
              backgroundColor: `hsl(${38 + e.hueShift}, 70%, 65%)`,
              boxShadow: `0 0 ${e.size * 4}px hsl(${38 + e.hueShift}, 70%, 60%)`,
              animation: `loaderEmberRise ${e.duration}s linear ${e.delay}s infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* ── Splash gate — Yaran-Ri blessing over Lux video, fades out once user clicks to begin ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: started ? 0 : (splashReady ? 1 : 0),
          transition: started ? "opacity 500ms ease-out" : "opacity 1200ms ease-out",
        }}
      >
        {/* Video backdrop — muted autoplay (browsers allow this without user gesture) */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: "cover",
            opacity: 0.85,
          }}
        >
          <source src="/videos/lux-blessing.mp4" type="video/mp4" />
        </video>

        {/* Dark vignette over video for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 25%, rgba(0,0,0,0.70) 80%)",
          }}
        />

        {/* Text content centered above video */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <p
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.6vw, 36px)",
              letterSpacing: "0.08em",
              color: "hsl(38, 65%, 82%)",
              margin: 0,
              textAlign: "center",
              textShadow:
                "0 0 35px rgba(220, 180, 80, 0.35), 0 0 80px rgba(220, 180, 80, 0.20), 0 2px 10px rgba(0,0,0,0.85)",
              animation: !started ? "loaderTaglinePulse 4.5s ease-in-out infinite" : "none",
            }}
          >
            Mau santi an atway.
          </p>
          <p
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(11px, 1.2vw, 15px)",
              letterSpacing: "0.32em",
              color: "hsl(0, 0%, 78%)",
              marginTop: "22px",
              marginBottom: 0,
              textTransform: "uppercase",
              textAlign: "center",
              textShadow: "0 2px 10px rgba(0,0,0,0.85)",
            }}
          >
            Blessings upon the passage
          </p>
          <p
            style={{
              position: "absolute",
              bottom: "10vh",
              fontFamily: "'Cinzel', serif",
              fontSize: "10px",
              letterSpacing: "0.4em",
              color: "hsl(38, 35%, 70%)",
              opacity: splashReady ? 0.7 : 0,
              transition: "opacity 1.6s ease-out 0.8s",
              animation: !started ? "loaderTaglinePulse 2.4s ease-in-out 1.2s infinite" : "none",
              margin: 0,
              textTransform: "uppercase",
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            Click anywhere to begin
          </p>
        </div>
      </div>

      {/* ── Center stack — fades out fast when slash hits ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none"
        style={{
          opacity: !started || exiting ? 0 : 1,
          transition: "opacity 600ms ease-out",
        }}
      >
        {/* Kanji 伝承 */}
        <div style={{ display: "flex", gap: "0.05em" }}>
          <span
            style={{
              ...kanjiBase,
              opacity: phase >= 1 ? 1 : 0,
              filter: phase >= 1 ? "blur(0)" : "blur(8px)",
              transform: phase >= 1 ? "scale(1)" : "scale(0.92)",
              animation: phase >= 3 && !exiting ? "loaderBreath 4.2s ease-in-out infinite" : "none",
            }}
          >
            伝
          </span>
          <span
            style={{
              ...kanjiBase,
              opacity: phase >= 2 ? 1 : 0,
              filter: phase >= 2 ? "blur(0)" : "blur(8px)",
              transform: phase >= 2 ? "scale(1)" : "scale(0.92)",
              animation: phase >= 3 && !exiting ? "loaderBreath 4.2s ease-in-out 0.6s infinite" : "none",
            }}
          >
            承
          </span>
        </div>

        {/* Gold separator */}
        <div
          style={{
            height: "1px",
            marginTop: "44px",
            width: phase >= 3 ? "min(280px, 60vw)" : "0",
            background: "linear-gradient(to right, transparent, hsl(38, 60%, 55%), transparent)",
            opacity: phase >= 3 ? 0.75 : 0,
            transition: "width 1100ms ease-out, opacity 1100ms ease-out",
          }}
        />

        {/* Supertitle — Chronicles of the Shibui Universe (above the title) */}
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 400,
            fontSize: "clamp(10px, 1.05vw, 13px)",
            letterSpacing: "0.5em",
            color: "hsl(38, 35%, 65%)",
            marginTop: "26px",
            marginBottom: 0,
            textTransform: "uppercase",
            opacity: phase >= 3 ? 0.7 : 0,
            transition: "opacity 1.4s ease-out 0.4s",
            textAlign: "center",
          }}
        >
          Chronicles of the Shibui Universe
        </p>

        {/* Title — letters cascade in */}
        <h1
          style={{
            fontFamily: "'Cinzel', 'Times New Roman', serif",
            fontSize: "clamp(22px, 3.6vw, 48px)",
            fontWeight: 500,
            letterSpacing: "0.4em",
            color: "hsl(0, 0%, 92%)",
            marginTop: "10px",
            marginBottom: 0,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {titleChars.map(({ ch, key, delay }) => (
            <span
              key={key}
              style={{
                display: "inline-block",
                opacity: phase >= 4 ? 1 : 0,
                transform: phase >= 4 ? "translateY(0)" : "translateY(14px)",
                filter: phase >= 4 ? "blur(0)" : "blur(3px)",
                transition: `opacity 900ms ease-out ${delay}ms, transform 900ms ease-out ${delay}ms, filter 900ms ease-out ${delay}ms`,
                whiteSpace: "pre",
              }}
            >
              {ch === " " ? "  " : ch}
            </span>
          ))}
        </h1>

        {/* Yaran-Ri proverb — the Light Walker tongue */}
        <p
          style={{
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(15px, 1.7vw, 22px)",
            letterSpacing: "0.12em",
            color: "hsl(38, 55%, 78%)",
            marginTop: "26px",
            marginBottom: 0,
            opacity: phase >= 5 ? 0.95 : 0,
            transition: "opacity 1.6s ease-out",
            textAlign: "center",
            animation: phase >= 5 && !exiting ? "loaderTaglinePulse 4.5s ease-in-out 1.6s infinite" : "none",
          }}
        >
          Tatulum patem m'ber kanatauna.
        </p>

        {/* English subtitle */}
        <p
          style={{
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontWeight: 300,
            fontSize: "clamp(11px, 1.1vw, 14px)",
            letterSpacing: "0.28em",
            color: "hsl(0, 0%, 55%)",
            marginTop: "12px",
            marginBottom: 0,
            opacity: phase >= 5 ? 0.65 : 0,
            transition: "opacity 1.8s ease-out 0.4s",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          The first battle is in the mind
        </p>

        {/* Enter the Keep — primary CTA, waits for user */}
        <div
          style={{
            marginTop: "44px",
            opacity: phase >= 5 ? 1 : 0,
            transform: phase >= 5 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1.4s ease-out 0.4s, transform 1.4s ease-out 0.4s",
            pointerEvents: phase >= 5 && !exiting ? "auto" : "none",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              enter();
            }}
            className="loader-enter-btn"
            disabled={exiting}
          >
            Enter the Keep
          </button>
        </div>
      </div>

      {/* Sound prompt — surfaces when autoplay was blocked */}
      {audioBlocked && musicEnabled && !exiting && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Cinzel', serif",
            fontSize: "10px",
            letterSpacing: "0.4em",
            color: "hsl(38, 50%, 70%)",
            opacity: 0.85,
            animation: "loaderTaglinePulse 2.6s ease-in-out infinite",
            textTransform: "uppercase",
            textShadow: "0 0 12px rgba(220, 180, 80, 0.4)",
          }}
        >
          🔊 tap anywhere to enable sound
        </div>
      )}

      {/* ── Slash effects — only render during exit ── */}
      {exiting && (
        <>
          {/* The slash streak — thin gold/white line sweeping along the diagonal */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              width: "8px",
              height: "140vh",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.95) 30%, rgba(255,220,140,1) 50%, rgba(255,255,255,0.95) 70%, transparent 100%)",
              boxShadow:
                "0 0 30px rgba(255, 220, 140, 0.9), 0 0 80px rgba(255, 200, 100, 0.6)",
              borderRadius: "50%",
              animation: "loaderSlash 700ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
          />
          {/* Full-screen flash — burst of brightness at slash moment */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: "rgba(255, 240, 200, 1)",
              animation: "loaderFlash 600ms ease-out forwards",
            }}
          />
        </>
      )}
    </div>
  );
}
