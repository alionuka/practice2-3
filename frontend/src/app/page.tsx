import { Footer } from "@/components/custom/Footer";
import { TopNavigation } from "@/components/custom/TopNavigation";
import { HeroSection } from "@/components/custom/HeroSection";
import { FeaturesSection } from "@/components/custom/FeaturesSection";
import { services } from "@/data/services";

export default async function Home() {
  const homePageData = await services.homePage.getHomePageData();

  return (
    <>
      <TopNavigation />

      <main>
        {homePageData.blocks.map((block: any, index: number) => {
          if (block.__component === "layout.hero-section") {
            return <HeroSection key={`${block.__component}-${block.id}-${index}`} data={block} />;
          }

          if (block.__component === "layout.features-section") {
            return <FeaturesSection key={`${block.__component}-${block.id}-${index}`} data={block} />;
          }

          return null;
        })}
      </main>

      <Footer />
    </>
  );
}