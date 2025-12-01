import { NextRequest, NextResponse } from "next/server";
import { loadSiteData, saveSiteData, type SiteConfig } from "@/lib/server/siteData";

export const runtime = "nodejs";

export async function GET() {
  const data = await loadSiteData();
  return NextResponse.json({
    heroTitle: data.heroTitle,
    heroSubtitle: data.heroSubtitle,
    heroImageUrl: data.heroImageUrl,
    phone: data.phone,
    line: data.line,
    lineUrl: data.lineUrl,
    facebook: data.facebook,
    mapUrl: data.mapUrl,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const current = await loadSiteData();

  const updated: SiteConfig = {
    ...current,
    heroTitle: body.heroTitle ?? current.heroTitle,
    heroSubtitle: body.heroSubtitle ?? current.heroSubtitle,
    heroImageUrl: body.heroImageUrl ?? current.heroImageUrl,
    phone: body.phone ?? current.phone,
    line: body.line ?? current.line,
    lineUrl: body.lineUrl ?? current.lineUrl,
    facebook: body.facebook ?? current.facebook,
    mapUrl: body.mapUrl ?? current.mapUrl,
  };

  await saveSiteData(updated);
  return NextResponse.json({ ok: true });
}
