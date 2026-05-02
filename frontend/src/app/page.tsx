import { loaders } from "@/data/loaders";
import { validateApiResponse } from "@/lib/error-handler";
import { BlockRenderer } from "@/components/custom/block-renderer";

export default async function Home() {
  const homePageResponse = await loaders.getHomePageData();
  const homePageData = validateApiResponse(homePageResponse, "home page");

  return <BlockRenderer blocks={homePageData.blocks} />;
}