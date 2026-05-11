import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: route not found —", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative text-center max-w-xl">
          <p className="font-display text-xs tracking-[0.4em] text-primary uppercase mb-4">
            迷子 — Lost
          </p>

          <h1 className="font-display text-7xl md:text-8xl tracking-wide mb-6 text-foreground">
            404
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-2 h-2 rotate-45 bg-primary/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>

          <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed mb-3">
            This path is not found in any of the chronicles.
          </p>
          <p className="font-body text-sm text-muted-foreground mb-10">
            <code className="font-mono text-xs">{location.pathname}</code>
          </p>

          <Link
            to="/"
            className="inline-block font-display text-xs tracking-[0.4em] uppercase text-foreground/85 border border-border/60 px-10 py-3.5 hover:border-primary/60 hover:text-primary transition-colors duration-300"
          >
            Return to the Keep
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
