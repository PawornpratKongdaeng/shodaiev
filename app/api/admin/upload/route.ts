
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { ok: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const ext = path.extname(file.name) || ".png";
    const base = path.basename(file.name, ext);
    const fileName = `${base}-${Date.now()}${ext}`;

    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    return NextResponse.json({
      ok: true,
      url: `/uploads/${fileName}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
