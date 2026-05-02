import Image from "next/image";
import { getStrapiURL } from "@/lib/utils";

type StrapiImageProps = {
  src: string;
  alt: string | null;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
};

export function getStrapiMedia(url: string | null | undefined) {
  const strapiURL = getStrapiURL();

  if (!url) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;

  return `${strapiURL}${url}`;
}

export function StrapiImage({
  src,
  alt,
  className,
  ...rest
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);

  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={alt ?? "No alternative text provided"}
      className={className}
      {...rest}
    />
  );
}