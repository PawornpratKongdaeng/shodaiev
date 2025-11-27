// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;

  // ไม่ใช่ /admin → ปล่อยผ่าน
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // อนุญาตหน้า login เอง เสมอ (กัน loop redirect)
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const authCookie = req.cookies.get("admin_auth");

  // ถ้ามี cookie แล้ว → ผ่าน
  if (authCookie?.value === "1") {
    return NextResponse.next();
  }

  // ยังไม่ได้ login → redirect ไปหน้า login
  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("redirect", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
