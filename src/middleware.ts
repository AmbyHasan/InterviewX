import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  const pathname = url.pathname;

  const isAuthPage =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up");

  const protectedRoutePrefixes = [
    "/authenticatedLandingPage",
    "/interview",
    "/my-resume",
    "/tools",
    "/ai-chat/history",
    "/ai-roadmap/history",
  ];

  const isProtected =
    pathname === "/" ||
    protectedRoutePrefixes.some(
      (routePrefix) =>
        pathname === routePrefix || pathname.startsWith(`${routePrefix}/`)
    );

  // Always allow auth pages
  if (isAuthPage) return NextResponse.next();

  // Block protected pages if user not logged in and redirect the users to the landing pages
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/landingPage", request.url));
  }

  return NextResponse.next();
}
