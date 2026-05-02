import Link from "next/link";

import type { THeader } from "@/types";
import { Button } from "@/components/ui/button";
import { SiteLogo } from "@/components/custom/site-logo";

export function SiteHeader({ data }: { data?: THeader | null }) {
  if (!data) return null;

  const { logoText, ctaButton } = data;

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <SiteLogo text={logoText.label} href={logoText.href} />

        {ctaButton?.href && (
          <Link
            href={ctaButton.href}
            target={ctaButton.isExternal ? "_blank" : undefined}
          >
            <Button>{ctaButton.label}</Button>
          </Link>
        )}
      </div>
    </header>
  );
}