import { NextRequest, NextResponse } from "next/server";
import { loadSiteData, saveSiteData, type SiteConfig } from "@/lib/server/siteData";

export const runtime = "nodejs";

type ContactPayload = {
  phone?: string;
  line?: string;
  lineUrl?: string;
  facebook?: string;
  mapUrl?: string;
};

export async function GET() {
  const data = await loadSiteData();
  const payload: ContactPayload = {
    phone: data.phone,
    line: data.line,
    lineUrl: data.lineUrl,
    facebook: data.facebook,
    mapUrl: data.mapUrl,
  };
  return NextResponse.json(payload);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ContactPayload;
  const current = await loadSiteData();

  const updated: SiteConfig = {
    ...current,
    phone: body.phone ?? current.phone,
    line: body.line ?? current.line,
    lineUrl: body.lineUrl ?? current.lineUrl,
    facebook: body.facebook ?? current.facebook,
    mapUrl: body.mapUrl ?? current.mapUrl,
  };

  await saveSiteData(updated);
  return NextResponse.json({ ok: true });
}
