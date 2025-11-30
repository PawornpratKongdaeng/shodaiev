// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOGIN_PATH = "/admin/login";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // จัดการเฉพาะ path ที่ขึ้นต้นด้วย /admin เท่านั้น
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // อนุญาตหน้า login เสมอ (ไม่เช็ค cookie)
  if (pathname === LOGIN_PATH) {
    return NextResponse.next();
  }

  // อ่าน cookie session
  const session = req.cookies.get("admin_session")?.value;

  // ถ้าไม่มี cookie → เด้งกลับหน้า login พร้อม callback
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("callback", pathname + search); // เช่น /admin
    return NextResponse.redirect(url);
  }

  // ถ้ามี cookie แล้ว → ปล่อยผ่านเข้า /admin ได้
  return NextResponse.next();
}

// ให้ middleware ทำงานเฉพาะ /admin
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
