import Link from "next/link";

import type { THeroSection } from "@/types";
import { StrapiImage } from "@/components/custom/strapi-image";

const styles = {
  header: "relative h-[600px] overflow-hidden bg-slate-950",
  backgroundImage: "absolute inset-0 h-full w-full object-cover",
  fallbackBackground:
    "absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-800 to-slate-950",
  overlay:
    "relative z-10 flex h-full flex-col items-center justify-center bg-black/40 px-6 text-center text-white",
  heading: "text-4xl font-bold md:text-5xl lg:text-6xl",
  subheading: "mt-4 max-w-3xl text-lg md:text-xl lg:text-2xl",
  button:
    "mt-8 inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-black shadow transition-colors hover:bg-gray-100",
};

export function SiteHeroSection({ data }: { data: THeroSection }) {
  if (!data) return null;

  const { heading, subHeading, image, link } = data;

  return (
    <header className={styles.header}>
      {image?.url ? (
        <StrapiImage
          alt={image.alternativeText ?? "Hero image"}
          className={styles.backgroundImage}
          src={image.url}
          height={1080}
          width={1920}
          priority
        />
      ) : (
        <div className={styles.fallbackBackground} />
      )}

      <div className={styles.overlay}>
        <h1 className={styles.heading}>{heading}</h1>
        <p className={styles.subheading}>{subHeading}</p>

        {link?.href && (
          <Link
            className={styles.button}
            href={link.href}
            target={link.isExternal ? "_blank" : undefined}
          >
            {link.label}
          </Link>
        )}
      </div>
    </header>
  );
}