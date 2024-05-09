import { NextRequest, NextResponse } from "next/server";

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

export async function middleware(request: NextRequest) {
  // get userInfo from cookie
  const userInfoCookie = request.cookies.get("userInfo");
  let userInfo: UserInfo | undefined;

  console.log("route from middleware: ", request.nextUrl.pathname);
  console.log("userInfoCookie from middleware: ", userInfoCookie);

  if (userInfoCookie === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    userInfo = JSON.parse(userInfoCookie.value);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    !userInfo ||
    !userInfo.firstName ||
    !userInfo.lastName ||
    !userInfo.email
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // redirect to chat if user has userInfo cookie and is on '/signup' or '/login'
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
