import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { JapaneseAccent } from "@/components/ui/JapaneseAccent";
import { supabase } from "@/integrations/supabase/client";

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: location, isLoading } = useQuery({
    queryKey: ["location", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!location) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl mb-4">Realm Not Found</h1>
            <Link to="/locations" className="text-primary hover:underline">
              Return to Realms
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Hero section with image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          {location.image_url ? (
            <img
              src={location.image_url}
              alt={location.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-card via-secondary to-card" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 vignette" />

          {/* Japanese accents */}
          <JapaneseAccent text="領域" position="left" />

          {/* Back button */}
          <div className="absolute top-24 left-6 z-10">
            <Link
              to="/locations"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Realms</span>
            </Link>
          </div>

          {/* Location name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              {location.region && (
                <div className="flex items-center gap-2 mb-3 opacity-0 animate-fade-in">
                  <MapPin size={14} className="text-primary" />
                  <p className="font-display text-xs tracking-[0.3em] text-primary uppercase">
                    {location.region}
                  </p>
                </div>
              )}
              <h1
                className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wide text-foreground text-shadow-dramatic opacity-0 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                {location.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="relative container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="md:col-span-2 space-y-10">
              {/* Description */}
              {location.description && (
                <section
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <p className="text-lg text-foreground/90 leading-relaxed border-l-2 border-primary pl-6">
                    {location.description}
                  </p>
                </section>
              )}

              {/* History */}
              {location.history && (
                <section
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <h2 className="font-display text-2xl tracking-wide mb-6 flex items-center gap-4">
                    <span className="text-primary">歴史</span>
                    <span>History</span>
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {location.history}
                    </p>
                  </div>
                </section>
              )}

              {/* Culture */}
              {location.culture && (
                <section
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  <h2 className="font-display text-2xl tracking-wide mb-6 flex items-center gap-4">
                    <span className="text-primary">文化</span>
                    <span>Culture</span>
                  </h2>
                  <div className="p-6 border border-border bg-card/30 backdrop-blur-sm">
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {location.culture}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div
                className="p-6 border border-border bg-card/30 backdrop-blur-sm opacity-0 animate-slide-in-right"
                style={{ animationDelay: "0.4s" }}
              >
                <h3 className="font-display text-sm tracking-widest uppercase text-muted-foreground mb-4">
                  Details
                </h3>
                <dl className="space-y-4">
                  {location.region && (
                    <div>
                      <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                        Region
                      </dt>
                      <dd className="text-foreground mt-1">{location.region}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                      Status
                    </dt>
                    <dd className="text-foreground mt-1">
                      {location.is_featured ? "Featured Realm" : "Documented"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LocationDetail;
