import { NextRequest, NextResponse } from "next/server";
import { loadSiteData, saveSiteData, type SiteConfig, type TopicItem } from "@/lib/server/siteData";

export const runtime = "nodejs";

type TopicsPayload = {
  topics: TopicItem[];
};

export async function GET() {
  const data = await loadSiteData();
  const payload: TopicsPayload = {
    topics: Array.isArray(data.topics) ? (data.topics as TopicItem[]) : [],
  };
  return NextResponse.json(payload);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as TopicsPayload;
  const current = await loadSiteData();

  const updated: SiteConfig = {
    ...current,
    topics: Array.isArray(body.topics) ? body.topics : [],
  };

  await saveSiteData(updated);
  return NextResponse.json({ ok: true });
}
