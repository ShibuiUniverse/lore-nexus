import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, BookOpen, Scroll, Sword, Play, FileText } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { JapaneseAccent } from "@/components/ui/JapaneseAccent";
import { supabase } from "@/integrations/supabase/client";

// ── constants ────────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  legend:      "Legend",
  lore:        "Lore",
  chronicle:   "Chronicle",
  manga:       "Manga",
  short_story: "Short Story",
  trailer:     "Trailer",
};

const TYPE_KANJI: Record<string, string> = {
  legend:      "伝説",
  lore:        "伝承",
  chronicle:   "年代記",
  manga:       "漫画",
  short_story: "短編",
  trailer:     "予告",
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  legend:      <Scroll size={16} />,
  lore:        <BookOpen size={16} />,
  chronicle:   <BookOpen size={16} />,
  manga:       <Sword size={16} />,
  short_story: <FileText size={16} />,
  trailer:     <Play size={16} />,
};

// ── helpers ──────────────────────────────────────────────────────────────────

const readingTime = (text: string) =>
  Math.max(1, Math.round(text.split(/\s+/).length / 200));

const renderInline = (text: string, key: number) => {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <p key={key} className="text-foreground/85 font-body text-lg leading-[1.9] mb-6">
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className="not-italic text-foreground/60 font-light tracking-wide">
            {part.slice(1, -1)}
          </em>
        ) : (
          part
        )
      )}
    </p>
  );
};

// Convert YouTube/Vimeo share URLs to embeddable form
const getEmbedUrl = (url: string): string => {
  if (url.includes("youtube.com/watch")) {
    const id = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("vimeo.com/")) {
    const id = url.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${id}`;
  }
  return url;
};

const renderContent = (content: string) =>
  content.split(/\n\n+/).map((block, i) => {
    const t = block.trim();
    if (t === "---" || t.startsWith("---")) {
      return (
        <div key={i} className="flex items-center gap-4 my-10">
          <div className="h-px flex-1 bg-border/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-primary/50" />
          <div className="h-px flex-1 bg-border/40" />
        </div>
      );
    }
    return renderInline(t, i);
  });

// ── component ─────────────────────────────────────────────────────────────────

const StoryDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: story, isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // All images for this story — hero first, then any gallery additions
  const allImages = story
    ? [story.thumbnail_url, ...((story.gallery_urls as string[] | null) ?? [])].filter(Boolean) as string[]
    : [];
  const hasGallery = allImages.length > 1;
  const [activeImage, setActiveImage] = useState<string | null>(allImages[0] ?? null);

  // Title card auto-fades after a short delay so it stops covering the hero art.
  // Reappears on hover over the hero/title area.
  const [titleVisible, setTitleVisible] = useState(true);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleFade = (ms: number) => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    fadeTimerRef.current = setTimeout(() => setTitleVisible(false), ms);
  };
  const cancelFade = () => {
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  };
  const showTitle = () => { cancelFade(); setTitleVisible(true); };
  const queueHide = () => scheduleFade(1500);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(allImages[0] ?? null);
    setTitleVisible(true);
    scheduleFade(2800);
    return () => cancelFade();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, story?.id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!story) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h2 className="font-display text-2xl mb-4">Story Not Found</h2>
          <Link to="/stories" className="text-primary hover:underline font-display text-sm tracking-wider">
            Return to Chronicles
          </Link>
        </div>
      </Layout>
    );
  }

  const type      = story.story_type ?? "lore";
  const typeLabel = TYPE_LABELS[type] ?? type;
  const kanji     = TYPE_KANJI[type] ?? "年代記";
  const icon      = TYPE_ICONS[type] ?? <BookOpen size={16} />;
  const minutes   = story.content ? readingTime(story.content) : null;
  const isTrailer = type === "trailer";

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Background texture */}
        <div className="fixed inset-0 texture-parchment opacity-30 pointer-events-none" />

        {/* Japanese accents */}
        <JapaneseAccent text={kanji} position="left" />
        <JapaneseAccent text="年代記" position="right" />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div
          className="relative h-[50vh] md:h-[58vh] overflow-hidden"
          onMouseEnter={showTitle}
          onMouseLeave={queueHide}
        >
          {activeImage ? (
            <img
              key={activeImage}
              src={activeImage}
              alt={story.title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          )}

          {/* Gradient fade to page background */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          {/* Side vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />

          {/* Back button */}
          <Link
            to="/stories"
            className="absolute top-24 left-6 flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors z-10"
          >
            <ArrowLeft size={20} />
            <span className="font-display text-sm tracking-wider">Back to Chronicles</span>
          </Link>
        </div>

        {/* ── Content ──────────────────────────────────────────────────── */}
        <div className="relative container mx-auto px-6 -mt-40 pb-28">

          {/* Title card — auto-fades, reappears on hover */}
          <div
            onMouseEnter={showTitle}
            onMouseLeave={queueHide}
            className="relative bg-card/80 backdrop-blur-sm border border-border p-8 md:p-12 mb-8 transition-opacity duration-700 ease-out"
            style={{ opacity: titleVisible ? 1 : 0 }}
          >
            {/* Decorative corner */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/30" />

            <div className="flex items-center gap-3 mb-5">
              <span className="text-primary">{icon}</span>
              <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">
                {typeLabel}
              </span>
              {story.is_featured && (
                <span className="ml-auto px-2 py-0.5 text-xs uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
                  Featured
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide text-foreground mb-5 leading-tight">
              {story.title}
            </h1>

            {minutes && !isTrailer && (
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock size={13} />
                {minutes} min read
              </p>
            )}
          </div>

          {/* ── Two-column layout ───────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main — story content */}
            <div className="lg:col-span-2">

              {/* Video embed — renders for any story with a video_url, not just trailer types */}
              {story.video_url && (
                <div className="relative aspect-video w-full bg-black mb-8 border border-border">
                  <iframe
                    src={getEmbedUrl(story.video_url)}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={story.title}
                  />
                </div>
              )}

              {/* Gallery thumbnail strip — click to swap the hero image */}
              {hasGallery && (
                <div className="flex gap-2 p-3 mb-8 bg-card/50 backdrop-blur-sm border border-border overflow-x-auto">
                  {allImages.map((src) => (
                    <button
                      key={src}
                      onClick={() => {
                        setActiveImage(src);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`relative flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-all ${
                        src === activeImage
                          ? "border-primary"
                          : "border-transparent opacity-60 hover:opacity-100 hover:border-primary/40"
                      }`}
                      aria-label="View image"
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="bg-card/50 backdrop-blur-sm border border-border p-8 md:p-12">
                {/* Description as lead */}
                {story.description && (
                  <>
                    <p className="text-muted-foreground text-xl leading-relaxed font-light mb-8 pb-8 border-b border-border/30">
                      {story.description}
                    </p>
                  </>
                )}

                {/* Story body */}
                {story.content && (
                  <div className="max-w-none">
                    {renderContent(story.content)}
                  </div>
                )}

                {!story.content && !isTrailer && (
                  <p className="text-muted-foreground italic">
                    Content coming soon.
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">

              {/* Story info */}
              <div className="bg-card/50 backdrop-blur-sm border border-border p-6">
                <h3 className="font-display text-xs tracking-[0.25em] text-primary uppercase mb-5">
                  About this Story
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Type</dt>
                    <dd className="font-display text-sm tracking-wide flex items-center gap-2">
                      <span className="text-primary">{icon}</span>
                      {typeLabel}
                    </dd>
                  </div>
                  {minutes && !isTrailer && (
                    <div>
                      <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Reading Time</dt>
                      <dd className="font-display text-sm tracking-wide flex items-center gap-2">
                        <Clock size={13} className="text-primary" />
                        {minutes} min
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Back to chronicles */}
              <Link
                to="/stories"
                className="flex items-center gap-3 p-5 bg-card/50 border border-border hover:border-primary/40 transition-all duration-300 group"
              >
                <ArrowLeft size={16} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                <div>
                  <p className="font-display text-xs tracking-[0.2em] text-primary uppercase mb-0.5">Browse</p>
                  <p className="font-display text-sm tracking-wide group-hover:text-primary transition-colors">All Chronicles</p>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

import React from "react";
export default StoryDetail;
