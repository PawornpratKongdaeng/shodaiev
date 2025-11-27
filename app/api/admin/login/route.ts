// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const ok = username === ADMIN_USER && password === ADMIN_PASS;

  if (!ok) {
    return NextResponse.json(
      { ok: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" },
      { status: 401 }
    );
  }

  // เซ็ต cookie ง่าย ๆ ว่า login แล้ว
  const res = NextResponse.json({ ok: true });

  res.headers.append(
    "Set-Cookie",
    cookie.serialize("admin_auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 4, // 4 ชั่วโมง
    })
  );

  return res;
}
