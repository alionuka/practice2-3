import Link from "next/link";

type SiteLogoProps = {
  text: string;
  href?: string;
  dark?: boolean;
};

export function SiteLogo({ text, href = "/", dark = false }: SiteLogoProps) {
  return (
    <Link
      href={href}
      className={`text-xl font-bold ${dark ? "text-white" : "text-foreground"}`}
    >
      {text}
    </Link>
  );
}