import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/profile"];

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some((route) => {
    return pathname === route || pathname.startsWith(`${route}/`);
  });
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  const jwt = request.cookies.get("jwt")?.value;

  if (!jwt) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

  try {
    const response = await fetch(`${strapiUrl}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const redirectResponse = NextResponse.redirect(
        new URL("/signin", request.url)
      );

      redirectResponse.cookies.set("jwt", "", {
        path: "/",
        maxAge: 0,
      });

      return redirectResponse;
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware auth error:", error);

    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};