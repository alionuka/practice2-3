import { getStrapiURL } from "@/lib/utils";

export async function getUserMe(jwt: string) {
  const response = await fetch(`${getStrapiURL()}/api/users/me?populate=avatar`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.json();
}