import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { services } from "@/data/services";
import { getStrapiURL } from "@/lib/utils";
import { UploadFileForm } from "@/components/forms/upload-file-form";

function getAvatarUrl(url?: string | null) {
  if (!url) return null;

  if (url.startsWith("http")) {
    return url;
  }

  return `${getStrapiURL()}${url}`;
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    redirect("/signin");
  }

  const user = await services.user.getUserMe(jwt);

  if (!user) {
    redirect("/signin");
  }

  const avatarUrl = getAvatarUrl(user.avatar?.url);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 p-6">
      <section className="rounded-xl border p-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account profile image.
        </p>
      </section>

      <section className="grid gap-6 rounded-xl border p-6 md:grid-cols-[180px_1fr]">
        <div className="flex flex-col items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${user.username} avatar`}
              className="h-32 w-32 rounded-full border object-cover"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border bg-muted text-sm text-muted-foreground">
              No avatar
            </div>
          )}

          <div className="text-center">
            <p className="font-medium">{user.username}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Upload new image</h2>
          <UploadFileForm />
        </div>
      </section>
    </main>
  );
}