import { NextRequest, NextResponse } from "next/server";

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

export async function middleware(request: NextRequest) {
  const publicPaths = ["/", "/signup", "/login"];

  const privatePaths = [
    "/chat",
    "/chat/activeChat",
    "/friends",
    "/friends/new",
    "/profile",
  ];

  const currentPath = request.nextUrl.pathname;

  // get userInfo from cookie
  const userInfoCookie = request.cookies.get("userInfo");
  let userInfo: UserInfo | undefined;

  if (userInfoCookie === undefined && !publicPaths.includes(currentPath)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isDesktopCookie = request.cookies.get("isDesktop");

  if (isDesktopCookie === undefined && !publicPaths.includes(currentPath)) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  if (
    (userInfoCookie === undefined || isDesktopCookie === undefined) &&
    publicPaths.includes(currentPath)
  ) {
    return NextResponse.next();
  }

  const isDesktop = isDesktopCookie?.value;
  console.log("isDesktop", isDesktop);

  try {
    userInfo = userInfoCookie && JSON.parse(userInfoCookie?.value);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!userInfo && !publicPaths.includes(currentPath)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // redirect to chat if user has userInfo cookie and is on '/signup' or '/login'
  if (publicPaths.includes(currentPath)) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // logic for route '/chat/activeChat'
  if (request.nextUrl.pathname === "/chat/activeChat") {
    if (isDesktop === "true") {
      return NextResponse.redirect(new URL("/chat", request.url));
    }
  }

  // return
  return NextResponse.next();
}

//matching paths.
export const config = {
  matcher: [
    "/signup",
    "/login",
    "/chat",
    "/chat/new",
    "/friends",
    "/profile",
    "/friends/new",
    "/chat/activeChat",
  ],
};
