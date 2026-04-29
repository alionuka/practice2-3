import { getStrapiURL } from "@/lib/utils";

export async function getHomePageData() {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/home-page", baseUrl);

  url.search = new URLSearchParams({
    "populate[blocks][on][layout.hero-section][populate][image]": "true",
    "populate[blocks][on][layout.hero-section][populate][link]": "true",
    "populate[blocks][on][layout.features-section][populate][feature]": "true",
  }).toString();

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch home page data");
  }

  const data = await response.json();

  return data.data;
}