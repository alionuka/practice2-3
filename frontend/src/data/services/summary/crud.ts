import { getStrapiURL } from "@/lib/utils";

export type SummaryItem = {
  id: number;
  documentId: string;
  videoId: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

type StrapiCollectionResponse<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

type StrapiSingleResponse<T> = {
  data: T;
};

export async function getSummariesService(
  jwt: string,
  queryString: string = "",
  currentPage: number = 1
) {
  const PAGE_SIZE = 4;

  const url = new URL("/api/summaries", getStrapiURL());

  url.searchParams.set("sort", "createdAt:desc");
  url.searchParams.set("pagination[page]", String(currentPage));
  url.searchParams.set("pagination[pageSize]", String(PAGE_SIZE));

  if (queryString) {
    url.searchParams.set("filters[$or][0][title][$containsi]", queryString);
    url.searchParams.set("filters[$or][1][content][$containsi]", queryString);
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch summaries.");
  }

  return response.json() as Promise<StrapiCollectionResponse<SummaryItem>>;
}

export async function deleteSummaryService(documentId: string, jwt: string) {
  const response = await fetch(`${getStrapiURL()}/api/summaries/${documentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to delete summary.");
  }

  return {
    success: true,
  };
}

export async function getSummaryByDocumentIdService(
  documentId: string,
  jwt: string
) {
  const response = await fetch(`${getStrapiURL()}/api/summaries/${documentId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch summary.");
  }

  return response.json() as Promise<StrapiSingleResponse<SummaryItem>>;
}

export async function updateSummaryService(
  documentId: string,
  data: {
    title?: string;
    content?: string;
  },
  jwt: string
) {
  const response = await fetch(`${getStrapiURL()}/api/summaries/${documentId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to update summary.");
  }

  return response.json() as Promise<StrapiSingleResponse<SummaryItem>>;
}