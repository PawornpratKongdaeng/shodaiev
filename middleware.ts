import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  const isAdminPath =
    pathname === "/admin" || pathname.startsWith("/admin/");

  if (!isAdminPath) {
    return NextResponse.next();
  }

  const adminSession = req.cookies.get("admin_session")?.value;

  if (!adminSession) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("callback", pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
