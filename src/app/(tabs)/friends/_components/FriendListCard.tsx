import UserAvatar from "@/components/UserAvatar";
import { Card } from "@/components/ui/card";
import { Friend } from "@/types";
import UnfriendBtn from "./UnfriendBtn";

function FriendListCard({
  friend,
  removeFriendFromList,
}: {
  friend: Friend;
  removeFriendFromList: (friendId: string) => void;
}) {
  const { friendId, firstName, lastName, profileImageUrl, email } = friend;

  const name = `${firstName} ${lastName}`;

  return (
    <Card className="pl-2 pr-6 py-4 flex flex-row gap-4 items-center border-none shadow-none hover:bg-gray-100">
      <UserAvatar
        firstName={firstName}
        lastName={lastName}
        profileImageUrl={profileImageUrl}
        classes="w-16 h-16 border border-primary"
      />
      <div className="flex flex-col gap-0 items-start flex-grow">
        <p>{name}</p>
        <p>{email}</p>
      </div>
      <UnfriendBtn
        {...{ friendId, firstName, lastName, removeFriendFromList }}
      />
    </Card>
  );
}

export default FriendListCard;
