// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { ok: false, message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" },
      { status: 400 }
    );
  }

  const ok = username === ADMIN_USER && password === ADMIN_PASS;

  if (!ok) {
    return NextResponse.json(
      { ok: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });

  // ตั้ง cookie admin_auth = 1
  res.cookies.set("admin_auth", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 8, // 8 ชั่วโมง
  });

  return res;
}
