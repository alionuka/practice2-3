import { HeroSection } from "@/components/custom/HeroSection";
import { FeaturesSection } from "@/components/custom/FeaturesSection";
import { TopNavigation } from "@/components/custom/TopNavigation";
import { Footer } from "@/components/custom/Footer";

export default function Home() {
  return (
    <>
      <TopNavigation />

      <main>
        <HeroSection />
        <FeaturesSection />
      </main>

      <Footer />
    </>
  );
}