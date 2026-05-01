import { getStrapiURL } from "@/lib/utils";

type SaveSummaryPayload = {
  videoId: string;
  title: string;
  content: string;
  userId: string;
};

export async function saveSummaryService(
  payload: SaveSummaryPayload,
  jwt: string
) {
  const response = await fetch(`${getStrapiURL()}/api/summaries`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: payload,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      error: data.error,
    };
  }

  return data;
}