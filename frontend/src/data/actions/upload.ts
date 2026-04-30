"use server";

import { cookies } from "next/headers";
import { services } from "@/data/services";
import { getStrapiURL } from "@/lib/utils";

export async function uploadFileAction(formData: FormData): Promise<void> {
  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    console.log("No file selected");
    return;
  }

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    console.log("No JWT found");
    return;
  }

  const uploadResponse = await services.upload.uploadFileService(file, jwt);

  if (uploadResponse?.error) {
    console.log("Upload error:", uploadResponse.error.message);
    return;
  }

  const uploadedFile = uploadResponse[0];

  const payload = JSON.parse(
    Buffer.from(jwt.split(".")[1], "base64").toString()
  );

  const userId = payload.id;

  const updateResponse = await fetch(`${getStrapiURL()}/api/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: uploadedFile.id,
    }),
  });

  const updateData = await updateResponse.json();

  if (!updateResponse.ok) {
    console.log("User update error:", updateData);
    return;
  }

  console.log("User updated with avatar:", updateData);
}