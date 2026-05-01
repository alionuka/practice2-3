import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

export function extractYouTubeID(urlOrID: string): string | null {
  const regExpID = /^[a-zA-Z0-9_-]{11}$/;

  if (regExpID.test(urlOrID)) {
    return urlOrID;
  }

  const regExpStandard = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const regExpShorts = /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;
  const regExpShort = /youtu\.be\/([a-zA-Z0-9_-]+)/;

  const matchStandard = urlOrID.match(regExpStandard);
  if (matchStandard) return matchStandard[1];

  const matchShorts = urlOrID.match(regExpShorts);
  if (matchShorts) return matchShorts[1];

  const matchShort = urlOrID.match(regExpShort);
  if (matchShort) return matchShort[1];

  return null;
}