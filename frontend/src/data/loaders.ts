import qs from "qs";

import { api } from "@/data/data-api";
import { getStrapiURL } from "@/lib/utils";
import type {
  TGlobal,
  THomePage,
  TMetaData,
  TStrapiResponse,
} from "@/types";

const baseUrl = getStrapiURL();

async function getHomePageData(): Promise<TStrapiResponse<THomePage>> {
  const query = qs.stringify({
    populate: {
      blocks: {
        on: {
          "layout.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "width", "height"],
              },
              link: {
                populate: true,
              },
            },
          },
          "layout.features-section": {
            populate: {
              features: {
                populate: true,
              },
            },
          },
        },
      },
    },
  });

  const url = new URL("/api/home-page", baseUrl);
  url.search = query;

  return api.get<THomePage>(url.href, {
    cache: "force-cache",
  });
}

async function getGlobalData(): Promise<TStrapiResponse<TGlobal>> {
  const query = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  });

  const url = new URL("/api/global", baseUrl);
  url.search = query;

  return api.get<TGlobal>(url.href, {
    cache: "force-cache",
  });
}

async function getMetaData(): Promise<TStrapiResponse<TMetaData>> {
  const query = qs.stringify({
    fields: ["title", "description"],
  });

  const url = new URL("/api/global", baseUrl);
  url.search = query;

  return api.get<TMetaData>(url.href, {
    cache: "force-cache",
  });
}

export const loaders = {
  getHomePageData,
  getGlobalData,
  getMetaData,
};