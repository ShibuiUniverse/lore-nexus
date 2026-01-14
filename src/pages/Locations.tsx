import { Layout } from "@/components/layout/Layout";

const Locations = () => {
  return (
    <Layout>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="font-display text-xs tracking-[0.3em] text-primary uppercase mb-4">領域</p>
          <h1 className="font-display text-4xl md:text-5xl tracking-wide mb-6">Realms</h1>
          <p className="text-muted-foreground">Coming soon - discover the lands and cultures.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Locations;
