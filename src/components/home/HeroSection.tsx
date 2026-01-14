import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { JapaneseAccent } from "@/components/ui/JapaneseAccent";

export function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 texture-parchment" />
      <ParticleBackground />
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette pointer-events-none" />
      
      {/* Japanese accent text */}
      <JapaneseAccent text="伝説の書" position="left" />
      <JapaneseAccent text="物語の記録" position="right" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <div className="w-2 h-2 rotate-45 border border-primary/50" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        {/* Title */}
        <h1 
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.2em] text-foreground text-shadow-dramatic opacity-0 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          THE LOREKEEPER
        </h1>

        {/* Subtitle */}
        <p 
          className="mt-6 font-body text-lg md:text-xl text-muted-foreground tracking-wide max-w-2xl mx-auto opacity-0 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          Explore the chronicles of a universe shaped by legend,
          <br className="hidden md:block" />
          where every story echoes through eternity.
        </p>

        {/* CTA Button */}
        <div 
          className="mt-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <Link
            to="/timeline"
            className="group relative inline-flex items-center gap-3 px-8 py-4 font-display text-sm tracking-widest uppercase border border-primary/50 text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300"
          >
            <span>Enter the Lore</span>
            <span className="w-6 h-px bg-primary group-hover:w-10 transition-all duration-300" />
          </Link>
        </div>

        {/* Navigation cards */}
        <div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto opacity-0 animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          {[
            { href: "/timeline", label: "Timeline", sublabel: "年表" },
            { href: "/characters", label: "Characters", sublabel: "人物" },
            { href: "/locations", label: "Realms", sublabel: "領域" },
            { href: "/stories", label: "Stories", sublabel: "物語" },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group p-6 border border-border/50 hover:border-primary/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:bg-card/50"
            >
              <p className="font-display text-xs tracking-widest text-muted-foreground mb-1">
                {item.sublabel}
              </p>
              <p className="font-display text-sm md:text-base tracking-wider text-foreground group-hover:text-primary transition-colors">
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-float"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}
