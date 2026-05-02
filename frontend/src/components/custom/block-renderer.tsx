import type { THomePageBlock } from "@/types";
import { SiteHeroSection } from "@/components/custom/site-hero-section";
import { SiteFeaturesSection } from "@/components/custom/site-features-section";

export function BlockRenderer({ blocks }: { blocks: THomePageBlock[] }) {
  if (!blocks?.length) return null;

  return blocks.map((block) => {
    switch (block.__component) {
      case "layout.hero-section":
        return (
          <SiteHeroSection
            key={`${block.__component}-${block.id}`}
            data={block}
          />
        );

      case "layout.features-section":
        return (
          <SiteFeaturesSection
            key={`${block.__component}-${block.id}`}
            data={block}
          />
        );

      default:
        return null;
    }
  });
}