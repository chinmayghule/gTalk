import { NavItem } from "@/types";
import NavElement from "./NavElement";

function BottomNavbar({ navItems }: { navItems: NavItem[] }) {
  return (
    <nav className="flex flex-row gap-4 justify-evenly py-3 bg-primary text-primary-foreground">
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

export default BottomNavbar;
