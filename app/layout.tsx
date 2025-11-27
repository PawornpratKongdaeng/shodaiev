import "./globals.css";
import type { Metadata } from "next";
import { loadSiteData, defaultTheme } from "@/lib/server/siteData";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shodaiev.com";

export const metadata: Metadata = { /* ...ตามที่ทำไว้... */ };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await loadSiteData();
  const theme = data.theme ?? defaultTheme;

  return (
    <html lang="th">
      <body
        style={{
          ["--color-primary" as any]: theme.primary,
          ["--color-primary-soft" as any]: theme.primarySoft,
          ["--color-accent" as any]: theme.accent,
          ["--color-bg" as any]: theme.background,
          ["--color-surface" as any]: theme.surface,
          ["--color-text" as any]: theme.text,
        }}
        className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]"
      >
        {children}
      </body>
    </html>
  );
}
