// app/api/admin/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "file is required" },
      { status: 400 }
    );
  }

  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  const blob = await put(`uploads/${fileName}`, file, {
    access: "public",
  });

  return NextResponse.json({
    ok: true,
    url: blob.url, // ใช้เป็น image URL ใน frontend ได้เลย
  });
}
