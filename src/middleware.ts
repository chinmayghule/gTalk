import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./lib/utils";

export async function middleware(request: NextRequest) {
  // get token from cookie
  const tokenCookie = request.cookies.get("token");
  let token: string | undefined;

  console.log("route from middleware: ", request.nextUrl.pathname);
  console.log("tokenCookie from middleware: ", tokenCookie);

  if (tokenCookie === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  token = tokenCookie.value;

  const payload = await validateToken(token);

  if (!payload || !payload.userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // redirect to chat if user has token and is on '/signup' or '/login'
  if (
    request.nextUrl.pathname === "/signup" ||
    request.nextUrl.pathname === "/login"
  ) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // logic for route '/friends/new'
  if (request.nextUrl.pathname === "/friends/new") {
    // redirect to chat if user is on `/friends/new`
    // and the viewport is greater than 1024px
    const isDesktopCookie = request.cookies.get("isDesktop");

    if (isDesktopCookie === undefined) {
      return NextResponse.redirect(new URL("/chat", request.url));
    }

    const isDesktop = isDesktopCookie.value;

    console.log("isDesktop: ", isDesktop);

    if (!Boolean(isDesktop)) {
      return NextResponse.redirect(new URL("/chat", request.url));
    }
  }

  // return
  return NextResponse.next();
}

//matching paths.
export const config = {
  matcher: ["/chat", "/friends", "/profile", "/friends/new"],
};
