import { NextRequest, NextResponse } from "next/server";
import { loadSiteData, saveSiteData, type SiteConfig } from "@/lib/server/siteData";

export const runtime = "nodejs";

export async function GET() {
  const data = await loadSiteData();
  return NextResponse.json({
    homeGallery: data.homeGallery ?? [],
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const current = await loadSiteData();

  const updated: SiteConfig = {
    ...current,
    homeGallery: Array.isArray(body.homeGallery)
      ? body.homeGallery
      : current.homeGallery ?? [],
  };

  await saveSiteData(updated);
  return NextResponse.json({ ok: true });
}
