import { notFound } from "next/navigation";
import type { TStrapiResponse } from "@/types";

export function validateApiResponse<T>(
  response: TStrapiResponse<T>,
  resourceName: string = "resource"
): T {
  if (!response || response.error) {
    if (response?.error?.status === 404) {
      notFound();
    }

    throw new Error(
      response?.error?.message || `Failed to load ${resourceName}`
    );
  }

  if (!response.data) {
    notFound();
  }

  return response.data;
}