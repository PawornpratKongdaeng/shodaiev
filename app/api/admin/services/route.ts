// app/api/admin/services/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  loadSiteData,
  saveSiteData,
  type SiteConfig,
  type ServiceItem,
} from "@/lib/server/siteData";

export const runtime = "nodejs";

type ServicesPayload = {
  services: ServiceItem[];
};

export async function GET() {
  try {
    const data = await loadSiteData();
    const payload: ServicesPayload = {
      services: Array.isArray(data.services) ? data.services : [],
    };
    return NextResponse.json(payload);
  } catch (err) {
    console.error("[GET /api/admin/services]", err);
    return NextResponse.json(
      { ok: false, error: "Cannot load services" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ServicesPayload> | null;

    if (!body || !Array.isArray(body.services)) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const current = await loadSiteData();

    const updated: SiteConfig = {
      ...current,
      services: body.services,
    };

    await saveSiteData(updated);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/admin/services]", err);
    return NextResponse.json(
      { ok: false, error: "Cannot save services" },
      { status: 500 }
    );
  }
}
