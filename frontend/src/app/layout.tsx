import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/custom/site-header";
import { SiteFooter } from "@/components/custom/site-footer";
import { loaders } from "@/data/loaders";
import { validateApiResponse } from "@/lib/error-handler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const metadataResponse = await loaders.getMetaData();

  return {
    title: metadataResponse.data?.title ?? "Summarize AI",
    description:
      metadataResponse.data?.description ??
      "AI-powered YouTube video summary application",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalDataResponse = await loaders.getGlobalData();
  const globalData = validateApiResponse(globalDataResponse, "global data");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader data={globalData.header} />
        {children}
        <SiteFooter data={globalData.footer} />
        <Toaster />
      </body>
    </html>
  );
}