import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";

function FriendListCard({
  friendId,
  friendProfileImageUrl,
  friendFirstName,
  friendLastName,
  friendEmail,
}: {
  friendId: string;
  friendProfileImageUrl: string | undefined;
  friendFirstName: string;
  friendLastName: string;
  friendEmail: string;
}) {
  const friendName = `${friendFirstName} ${friendLastName}`;

  // event handlers.
  const handleFriendCardClick = (friendId: string) => {
    alert("start new conversation with: " + friendId);
  };

  return (
    <Button
      variant={"outline"}
      className="px-2 py-4 flex flex-row gap-4 items-center justify-normal border-none shadow-none hover:bg-gray-100 h-fit w-full"
      onClick={() => handleFriendCardClick(friendId)}
    >
      <UserAvatar
        firstName={friendFirstName}
        lastName={friendLastName}
        profileImageUrl={friendProfileImageUrl}
        classes="w-16 h-16 border border-primary"
      />
      <div className="flex flex-col gap-0 items-start flex-grow">
        <p className="text-xl font-regular">{friendName}</p>
        <p className="text-base font-regular">{friendEmail}</p>
      </div>
    </Button>
  );
}

export default FriendListCard;
