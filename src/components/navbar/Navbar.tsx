"use client";

import BottomNavbar from "@/components/navbar/BottomNavbar";
import DesktopNavbar from "@/components/navbar/DesktopNavbar";
import { NavItem } from "@/types";
import { MessageSquareText, Users } from "lucide-react";
import { usePathname } from "next/navigation";

import { useViewportSize } from "@/contexts/ViewportSize";
import cookie from "cookiejs";
import UserAvatar from "@/components/UserAvatar";

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl?: string;
};

function Navbar() {
  const { isDesktop } = useViewportSize();
  const pathname = usePathname();
  const chatIdPathnameRegex = /\/chat\/\w+/;

  const userInfoCookie = cookie.get("userInfo") as string | undefined;
  let firstName, lastName;

  if (userInfoCookie) {
    const decodedCookieValue = decodeURIComponent(userInfoCookie);
    const userInfo = JSON.parse(decodedCookieValue) as UserInfo;
    firstName = userInfo.firstName;
    lastName = userInfo.lastName;
  }

  const navItems: NavItem[] = [
    {
      icon: <MessageSquareText />,
      route: "/chat",
      tooltipContent: "Messages",
      isActive: pathname.startsWith("/chat"),
    },
    {
      icon: <Users />,
      route: "/friends",
      tooltipContent: "Chats",
      isActive: pathname.startsWith("/friends"),
    },
    {
      icon: <UserAvatar firstName={firstName} lastName={lastName} />,
      route: "/profile",
      tooltipContent: "Profile",
      isActive: pathname.startsWith("/profile"),
    },
  ];

  if (!isDesktop && chatIdPathnameRegex.test(pathname)) return null;

  if (!isDesktop) return <BottomNavbar navItems={navItems} />;

  return <DesktopNavbar navItems={navItems} />;
}

export default Navbar;
