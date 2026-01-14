import { Layout } from "@/components/layout/Layout";

const Stories = () => {
  return (
    <Layout>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4">物語</p>
          <h1 className="font-display text-4xl md:text-5xl tracking-wide mb-6">Stories</h1>
          <p className="text-muted-foreground">Coming soon - side stories and animated trailers.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Stories;
