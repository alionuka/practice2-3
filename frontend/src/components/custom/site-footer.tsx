import Link from "next/link";

import type { TFooter } from "@/types";
import { SiteLogo } from "@/components/custom/site-logo";

export function SiteFooter({ data }: { data?: TFooter | null }) {
  if (!data) return null;

  const { logoText, text, socialLink } = data;

  return (
    <footer className="mt-20 border-t bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <SiteLogo text={logoText.label} href={logoText.href} dark />
          <p className="mt-2 text-sm text-slate-300">{text}</p>
        </div>

        <div className="flex gap-4">
          {socialLink?.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              className="text-sm text-slate-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}