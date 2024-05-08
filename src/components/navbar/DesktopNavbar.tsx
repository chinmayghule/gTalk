import React from "react";
import { NavItem } from "@/types";
import NavElement from "./NavElement";

function DesktopNavbar({ navItems }: { navItems: NavItem[] }) {
  return (
    <nav className="flex flex-col gap-4 items-center py-4 px-3 bg-primary text-primary-foreground min-h-screen grow-0 basis-auto">
      {navItems.map((item: NavItem) => (
        <NavElement
          key={item.route}
          icon={item.icon}
          route={item.route}
          tooltipContent={item.tooltipContent}
          isActive={item.isActive}
        />
      ))}
    </nav>
  );
}

export default DesktopNavbar;
