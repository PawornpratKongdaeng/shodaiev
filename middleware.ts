// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const basicAuthUser = process.env.ADMIN_USER;
const basicAuthPass = process.env.ADMIN_PASS;

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const isAdminPath = url.pathname.startsWith("/admin");

  if (!isAdminPath) return NextResponse.next();

  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse("Auth required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
    });
  }

  const base64 = authHeader.split(" ")[1] || "";
  let decoded = "";

  try {
    decoded = atob(base64); // Edge Runtime มี atob
  } catch {
    return new NextResponse("Invalid auth", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
    });
  }

  const [user, pass] = decoded.split(":");

  const ok = user === basicAuthUser && pass === basicAuthPass;

  if (!ok) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
