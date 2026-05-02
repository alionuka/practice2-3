"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { services } from "@/data/services";

export async function deleteSummaryAction(documentId: string) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    throw new Error("Unauthorized.");
  }

  await services.summarize.deleteSummaryService(documentId, jwt);

  revalidatePath("/dashboard/summaries");
}

export async function updateSummaryAction(
  documentId: string,
  formData: FormData
) {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    redirect("/signin");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  await services.summarize.updateSummaryService(
    documentId,
    {
      title,
      content,
    },
    jwt
  );

  revalidatePath("/dashboard/summaries");
  revalidatePath(`/dashboard/summaries/${documentId}`);

  redirect(`/dashboard/summaries/${documentId}`);
}