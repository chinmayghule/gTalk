import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

//  Renders an avatar for a user.
function UserAvatar({
  profileImageUrl = "",
  firstName,
  lastName,
  classes,
}: {
  profileImageUrl?: string;
  firstName: string | undefined;
  lastName: string | undefined;
  classes?: string;
}) {
  let initials;

  if (firstName && lastName) {
    initials =
      firstName?.charAt(0)?.toUpperCase() + lastName?.charAt(0)?.toUpperCase();
  }

  return (
    <Avatar className={cn("p-0", classes)}>
      <AvatarImage src={profileImageUrl} className={cn("p-0", classes)} />
      <AvatarFallback className={cn("text-primary", classes)}>
        {initials || <User />}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
