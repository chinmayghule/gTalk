import { cn } from "@/lib/utils";
import Link from "next/link";

function NavElement({
  icon,
  route,
  tooltipContent,
  isActive,
}: {
  icon: React.ReactNode;
  route: string;
  tooltipContent: React.ReactNode;
  isActive: boolean;
}) {
  // add tooltip later

  return (
    <Link
      href={route}
      className={cn({
        "p-4 last:p-2 rounded-md hover:text-accent-foreground transition-colors block aspect-square":
          true,
        "bg-accent text-accent-foreground": isActive,
        "last:mt-auto": true,
      })}
    >
      {icon}
    </Link>
  );
}

export default NavElement;
