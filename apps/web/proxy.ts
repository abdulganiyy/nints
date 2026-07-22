import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionForPage } from "./utils/session";
import { BASE_URL } from "./utils/constants";

const GUARDED_ROUTES: string[] = ["/dashboard"];

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  const matchedRoute = GUARDED_ROUTES.find((route) =>
    url.pathname.startsWith(route),
  );

  if (matchedRoute) {
    const session = await getSessionForPage();

    const user = session?.user;

    if (!user) {
      return NextResponse.redirect(new URL(BASE_URL, request.url));
    }
  }

  return NextResponse.rewrite(new URL(`/`, request.url));
}

// Config to specify matching criteria and skip static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$).*)",
  ],
};
