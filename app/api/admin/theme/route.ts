import { NextRequest, NextResponse } from "next/server";
import { loadSiteData, saveSiteData, type SiteConfig, type ThemeColors } from "@/lib/server/siteData";

export const runtime = "nodejs";

type ThemePayload = {
  theme?: ThemeColors;
};

export async function GET() {
  const data = await loadSiteData();
  const payload: ThemePayload = {
    theme: data.theme,
  };
  return NextResponse.json(payload);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ThemePayload;
  const current = await loadSiteData();

  const updated: SiteConfig = {
    ...current,
    theme: body.theme ?? current.theme,
  };

  await saveSiteData(updated);
  return NextResponse.json({ ok: true });
}
