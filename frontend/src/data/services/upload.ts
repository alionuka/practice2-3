import { getStrapiURL } from "@/lib/utils";

export type StrapiFile = {
  id: number;
  documentId?: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  formats?: unknown;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url: string;
  previewUrl?: string | null;
  provider?: string;
  createdAt?: string;
  updatedAt?: string;
};

type StrapiErrorResponse = {
  error: {
    status?: number;
    name?: string;
    message: string;
    details?: unknown;
  };
};

export async function uploadFileService(
  file: File,
  jwt: string
): Promise<StrapiFile[] | StrapiErrorResponse> {
  const url = new URL("/api/upload", getStrapiURL());

  const formData = new FormData();
  formData.append("files", file);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      error: data.error ?? {
        message: "Failed to upload file.",
      },
    };
  }

  return data;
}

export async function deleteFileService(fileId: number, jwt: string) {
  const response = await fetch(`${getStrapiURL()}/api/upload/files/${fileId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const data = await response.json();

    return {
      error: data.error ?? {
        message: "Failed to delete old file.",
      },
    };
  }

  return response.json();
}