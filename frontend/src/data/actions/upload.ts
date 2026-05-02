"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { services } from "@/data/services";

export type UploadFormState = {
  success: boolean;
  message: string;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

export async function uploadFileAction(
  prevState: UploadFormState,
  formData: FormData
): Promise<UploadFormState> {
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return {
      success: false,
      message: "Please select an image.",
    };
  }

  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return {
      success: false,
      message: "Only JPG, PNG, WEBP or GIF images are allowed.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      message: "Image must be smaller than 5 MB.",
    };
  }

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    return {
      success: false,
      message: "You must be signed in to upload an image.",
    };
  }

  const user = await services.user.getUserMe(jwt);

  if (!user?.id) {
    return {
      success: false,
      message: "Could not load user profile.",
    };
  }

  const oldAvatarId = user.avatar?.id;

  const uploadResponse = await services.upload.uploadFileService(file, jwt);

  if ("error" in uploadResponse) {
    return {
      success: false,
      message: uploadResponse.error.message,
    };
  }

  const uploadedFile = uploadResponse[0];

  if (!uploadedFile?.id) {
    return {
      success: false,
      message: "File uploaded, but Strapi did not return file data.",
    };
  }

  const updateResponse = await services.user.updateUserProfileService(
    user.id,
    {
      avatar: uploadedFile.id,
    },
    jwt
  );

  if ("error" in updateResponse) {
    return {
      success: false,
      message: updateResponse.error.message,
    };
  }

  if (oldAvatarId && oldAvatarId !== uploadedFile.id) {
    await services.upload.deleteFileService(oldAvatarId, jwt).catch(() => {
      console.log("Could not delete old avatar.");
    });
  }

  revalidatePath("/profile");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Profile image updated successfully.",
  };
}