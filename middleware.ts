// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "admin_auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ ให้ทำงานเฉพาะเส้นทางที่ขึ้นต้นด้วย /admin
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // ✅ ปล่อยหน้า login ผ่าน ไม่เช็ค cookie
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // ✅ เช็ค cookie สำหรับหน้า admin ที่เหลือ
  const token = req.cookies.get(ADMIN_COOKIE)?.value;

  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callback", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
