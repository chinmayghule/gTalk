import UserAvatar from "@/components/UserAvatar";
import { Card } from "@/components/ui/card";
import { FriendRequest } from "@/types";

function FriendRequestListCard({
  friendRequest,
}: {
  friendRequest: FriendRequest;
}) {
  const {
    friendRequestId,
    potentialFriendId,
    friendFirstName,
    friendLastName,
    profileImageUrl,
  } = friendRequest;

  const friendName = `${friendFirstName} ${friendLastName}`;

  return (
    <Card className="px-2 py-4 flex flex-row gap-4 items-center border-none shadow-none hover:bg-gray-100">
      <UserAvatar
        firstName={friendFirstName}
        lastName={friendLastName}
        profileImageUrl={profileImageUrl}
        classes="w-16 h-16 border border-primary"
      />
      <p>{friendName}</p>
    </Card>
  );
}

export default FriendRequestListCard;
