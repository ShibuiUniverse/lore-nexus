import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedSection />
    </Layout>
  );
};

export default Index;
