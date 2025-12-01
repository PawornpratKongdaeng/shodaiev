// app/api/admin/serviceDetail/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  loadSiteData,
  saveSiteData,
  type SiteConfig,
  type ServiceDetailItem,
} from "@/lib/server/siteData";

export const runtime = "nodejs";

type ServiceDetailPayload = {
  serviceDetails: ServiceDetailItem[];
};

export async function GET() {
  const data = await loadSiteData();
  const payload: ServiceDetailPayload = {
    serviceDetails: Array.isArray(data.serviceDetails)
      ? (data.serviceDetails as ServiceDetailItem[])
      : [],
  };
  return NextResponse.json(payload);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ServiceDetailPayload;
  const current = await loadSiteData();

  const updated: SiteConfig = {
    ...current,
    serviceDetails: Array.isArray(body.serviceDetails)
      ? body.serviceDetails
      : [],
  };

  await saveSiteData(updated);
  return NextResponse.json({ ok: true });
}
