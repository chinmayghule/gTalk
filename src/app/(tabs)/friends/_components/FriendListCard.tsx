import UserAvatar from "@/components/UserAvatar";
import { Card } from "@/components/ui/card";
import { Friend } from "@/types";

function FriendListCard({ friend }: { friend: Friend }) {
  const { friendId, firstName, lastName, profileImageUrl, email } = friend;

  const name = `${firstName} ${lastName}`;

  return (
    <Card className="px-2 py-4 flex flex-row gap-4 items-center border-none shadow-none hover:bg-gray-100">
      <UserAvatar
        firstName={firstName}
        lastName={lastName}
        profileImageUrl={profileImageUrl}
        classes="w-16 h-16 border border-primary"
      />
      <div className="flex flex-col gap-0 items-start">
        <p>{name}</p>
        <p>{email}</p>
      </div>
    </Card>
  );
}

export default FriendListCard;
