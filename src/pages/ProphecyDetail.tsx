import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Eye, EyeOff, CircleDot, HelpCircle, Calendar } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { JapaneseAccent } from "@/components/ui/JapaneseAccent";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  unfulfilled: {
    label: "Unfulfilled",
    icon: <EyeOff size={16} />,
    className: "text-muted-foreground border-muted-foreground/50 bg-muted/20",
  },
  partially_fulfilled: {
    label: "Partially Fulfilled",
    icon: <CircleDot size={16} />,
    className: "text-amber-400 border-amber-400/50 bg-amber-400/10",
  },
  fulfilled: {
    label: "Fulfilled",
    icon: <Eye size={16} />,
    className: "text-green-400 border-green-400/50 bg-green-400/10",
  },
  disputed: {
    label: "Disputed",
    icon: <HelpCircle size={16} />,
    className: "text-red-400 border-red-400/50 bg-red-400/10",
  },
};

const ProphecyDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: prophecy, isLoading } = useQuery({
    queryKey: ["prophecy", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prophecies")
        .select("*, eras(id, name, color)")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!prophecy) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h2 className="font-display text-2xl mb-4">Prophecy Not Found</h2>
          <Link to="/codex" className="text-primary hover:underline">
            Return to Codex
          </Link>
        </div>
      </Layout>
    );
  }

  const status = prophecy.status || "unfulfilled";
  const config = statusConfig[status] || statusConfig.unfulfilled;

  return (
    <Layout>
      <div className="relative min-h-screen pt-24">
        {/* Background texture */}
        <div className="fixed inset-0 texture-parchment opacity-30 pointer-events-none" />

        {/* Mystical background pattern */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)) 1px, transparent 1px),
                             radial-gradient(circle at 80% 50%, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
        </div>

        {/* Japanese accents */}
        <JapaneseAccent text="預言" position="left" />
        <JapaneseAccent text="運命" position="right" />

        {/* Back button */}
        <div className="container mx-auto px-6 mb-8">
          <Link
            to="/codex"
            className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-display text-sm tracking-wider">Back to Codex</span>
          </Link>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 pb-20">
          {/* Title section */}
          <div className="relative bg-card/80 backdrop-blur-sm border border-border p-8 md:p-12 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span
                className={cn(
                  "flex items-center gap-2 px-3 py-1 text-sm uppercase tracking-wider border",
                  config.className
                )}
              >
                {config.icon}
                {config.label}
              </span>
              {prophecy.is_featured && (
                <span className="px-3 py-1 text-sm uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
                  Major Prophecy
                </span>
              )}
              {prophecy.eras && (
                <span 
                  className="flex items-center gap-1 px-3 py-1 text-sm uppercase tracking-wider border"
                  style={{ 
                    borderColor: prophecy.eras.color || 'hsl(var(--border))',
                    color: prophecy.eras.color || 'hsl(var(--muted-foreground))'
                  }}
                >
                  <Calendar size={14} />
                  {prophecy.eras.name}
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl md:text-4xl tracking-wide text-foreground mb-6">
              {prophecy.name}
            </h1>

            {prophecy.source && (
              <p className="text-muted-foreground text-sm">
                Source: <span className="italic">{prophecy.source}</span>
              </p>
            )}
          </div>

          {/* Prophecy Text */}
          <div className="relative bg-card/50 backdrop-blur-sm border border-primary/30 p-8 md:p-12 mb-8 max-w-4xl mx-auto">
            <div className="absolute top-4 left-4 text-6xl text-primary/20 font-display">"</div>
            <div className="absolute bottom-4 right-4 text-6xl text-primary/20 font-display rotate-180">"</div>
            
            <blockquote className="relative text-lg md:text-xl text-foreground/90 leading-relaxed italic text-center px-8 py-4">
              {prophecy.prophecy_text}
            </blockquote>
          </div>

          {/* Interpretation */}
          {prophecy.interpretation && (
            <div className="relative bg-card/50 backdrop-blur-sm border border-border p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="font-display text-xl tracking-wider text-foreground mb-6">
                Interpretation
              </h2>
              <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {prophecy.interpretation}
              </p>
            </div>
          )}

          {/* Decorative footer */}
          <div className="flex items-center justify-center gap-2 mt-12 text-primary/30">
            <span className="w-12 h-px bg-current" />
            <span className="font-display text-xs tracking-[0.3em]">予言</span>
            <span className="w-12 h-px bg-current" />
          </div>

          {/* Back to list */}
          <div className="max-w-md mx-auto mt-16">
            <Link
              to="/codex"
              className="flex items-center gap-3 p-5 bg-card/50 border border-border hover:border-primary/40 transition-all duration-300 group"
            >
              <ArrowLeft size={16} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              <div>
                <p className="font-display text-xs tracking-[0.2em] text-primary uppercase mb-0.5">Browse</p>
                <p className="font-display text-sm tracking-wide group-hover:text-primary transition-colors">The Codex</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProphecyDetail;
