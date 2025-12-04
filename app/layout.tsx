// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { loadSiteData, defaultTheme } from "@/lib/server/siteData";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shodaiev.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ShodaiEV | ซ่อมรถไฟฟ้า 2 ล้อ 3 ล้อ บริการถึงบ้าน",
    template: "%s | ShodaiEV",
  },
  description:
    "ShodaiEV ให้บริการซ่อมรถไฟฟ้า มอเตอร์ไซค์ไฟฟ้า รถสามล้อไฟฟ้า สกู๊ตเตอร์ บริการถึงบ้านในพื้นที่ให้บริการ",
  keywords: [
    "ซ่อมรถไฟฟ้า",
    "มอเตอร์ไซค์ไฟฟ้า",
    "3 ล้อไฟฟ้า",
    "ซ่อมสกู๊ตเตอร์ไฟฟ้า",
    "บริการถึงบ้าน",
    "ShodaiEV",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "ShodaiEV ซ่อมรถไฟฟ้าและจำหน่ายอะไหล่",
    description:
      "บริการซ่อมมอเตอร์ไซค์ไฟฟ้า รถสามล้อไฟฟ้า สกู๊ตเตอร์ไฟฟ้า ",
    siteName: "ShodaiEV",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShodaiEV ซ่อมรถไฟฟ้าและจำหน่ายอะไหล่",
    description:
      "บริการซ่อมมอเตอร์ไซค์ไฟฟ้า รถสามล้อไฟฟ้า สกู๊ตเตอร์ไฟฟ้",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await loadSiteData();
  const theme = data.theme ?? defaultTheme;

  return (
    <html lang="th">
      <head>
        {/* เตรียม dataLayer สำหรับ GTM */}
        <Script
          id="gtm-datalayer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: "page_view",
                page_path: window.location.pathname,
                page_title: document.title
              });
            `,
          }}
        />

        {/* GTM main script */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NVXP6CL');
            `,
          }}
        />
      </head>

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
        {/* noscript สำหรับกรณีปิด JS (ตามที่ GTM แนะนำ) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NVXP6CL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {children}
      </body>
    </html>
  );
}
