import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) อนุญาตให้เข้าหน้า login เสมอ
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // 2) เฉพาะ path /admin เท่านั้นที่ต้องตรวจ cookie
  if (pathname.startsWith("/admin")) {
    const session = req.cookies.get("admin_session")?.value;

    if (!session) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callback", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Match เฉพาะ /admin ไม่รวม /api
export const config = {
  matcher: ["/admin/:path*"],
};
