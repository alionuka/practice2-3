import { getStrapiURL } from "@/lib/utils";

export async function uploadFileService(file: File, jwt: string) {
  const url = new URL("/api/upload", getStrapiURL());

  const formData = new FormData();
  formData.append("files", file);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      error: data.error,
    };
  }

  return data;
}