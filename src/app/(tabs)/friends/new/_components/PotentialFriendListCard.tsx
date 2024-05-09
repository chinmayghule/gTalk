"use client";

import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import useSendFriendRequest from "@/hooks/useSendFriendRequest";
import { CircleCheckBig } from "lucide-react";
import { useEffect } from "react";

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

  const { loading, initiateFriendRequest, response, error } =
    useSendFriendRequest({ receiverId: _id });

  // event handlers.
  const handlePotentialFriendCardClick = () => {
    initiateFriendRequest();

    if (response) {
      alert("friend request sent to : " + name);
    }
  };

  // effects.
  // show error through alert message if it exists.
  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (response) {
      alert(response);
    }
  }, [error, response]);

  return (
    <Button
      variant={"outline"}
      className="px-2 py-4 flex flex-row gap-4 items-center justify-normal border-none shadow-none hover:bg-gray-100 h-fit w-full"
      onClick={() => handlePotentialFriendCardClick()}
      disabled={loading || response}
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
      {response && <CircleCheckBig className="w-10 h-10 text-primary mr-8 " />}
    </Button>
  );
}

export default PotentialFriendListCard;
