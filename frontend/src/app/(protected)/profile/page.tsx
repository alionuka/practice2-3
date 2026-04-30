import { cookies } from "next/headers";
import { services } from "@/data/services";
import { UploadFileForm } from "@/components/forms/upload-file-form";
import { getStrapiURL } from "@/lib/utils";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  let user = null;

  if (jwt) {
    user = await services.user.getUserMe(jwt);
  }

  const avatarUrl = user?.avatar?.url
    ? `${getStrapiURL()}${user.avatar.url}`
    : null;

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold">Profile</h1>

      {avatarUrl && (
        <div className="mt-4">
          <img
  src={avatarUrl}
  alt="avatar"
  className="h-[150px] w-[150px] rounded-full object-cover"
/>
        </div>
      )}

      <UploadFileForm />
    </section>
  );
}