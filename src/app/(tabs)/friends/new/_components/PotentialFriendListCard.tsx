import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";

function PotentialFriendListCard({
  _id,
  profileImageUrl,
  firstName,
  lastName,
  email,
}: {
  _id: string;
  profileImageUrl: string | undefined;
  firstName: string;
  lastName: string;
  email: string;
}) {
  const name = `${firstName} ${lastName}`;

  // event handlers.
  const handlePotentialFriendCardClick = () => {
    alert("friend request sent to : " + name);
  };

  return (
    <Button
      variant={"outline"}
      className="px-2 py-4 flex flex-row gap-4 items-center justify-normal border-none shadow-none hover:bg-gray-100 h-fit w-full"
      onClick={() => handlePotentialFriendCardClick()}
    >
      <UserAvatar
        firstName={firstName}
        lastName={lastName}
        profileImageUrl={profileImageUrl}
        classes="w-16 h-16 border border-primary"
      />
      <div className="flex flex-col gap-0 items-start flex-grow">
        <p className="text-xl font-regular">{name}</p>
        <p className="text-base font-regular">{email}</p>
      </div>
    </Button>
  );
}

export default PotentialFriendListCard;
