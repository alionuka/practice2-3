import { getStrapiURL } from "@/lib/utils";
import type { StrapiFile } from "./upload";

export type UserMe = {
  id: number;
  documentId?: string;
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  avatar?: StrapiFile | null;
};

type StrapiErrorResponse = {
  error: {
    status?: number;
    name?: string;
    message: string;
    details?: unknown;
  };
};

export async function getUserMe(jwt: string): Promise<UserMe | null> {
  const response = await fetch(`${getStrapiURL()}/api/users/me?populate=avatar`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function updateUserProfileService(
  userId: number,
  data: {
    avatar?: number;
  },
  jwt: string
): Promise<UserMe | StrapiErrorResponse> {
  const response = await fetch(`${getStrapiURL()}/api/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      error: responseData.error ?? {
        message: "Failed to update user profile.",
      },
    };
  }

  return responseData;
}