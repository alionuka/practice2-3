import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getStrapiURL } from "@/lib/utils";

export function HeroSection({ data }: { data: any }) {
  const imageUrl = data.image?.url
    ? `${getStrapiURL()}${data.image.url}`
    : null;

  const link = Array.isArray(data.link) ? data.link[0] : data.link;

  return (
    <section className="container mx-auto grid gap-8 py-24 md:grid-cols-2 md:items-center">
      <div>
        <h1 className="text-5xl font-bold tracking-tight">{data.heading}</h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          {data.subHeading}
        </p>

        {link?.href && (
          <div className="mt-8">
            <Link href={link.href}>
              <Button size="lg">{link.text}</Button>
            </Link>
          </div>
        )}
      </div>

      {imageUrl && (
<img
  src={imageUrl}
  alt={data.heading}
  className="rounded-lg border"
/>
      )}
    </section>
  );
}