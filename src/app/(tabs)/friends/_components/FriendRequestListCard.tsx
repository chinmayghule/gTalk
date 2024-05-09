"use client";

import UserAvatar from "@/components/UserAvatar";
import { Card } from "@/components/ui/card";
import { FriendRequest } from "@/types";
import CancelFriendRequestBtn from "./CancelFriendRequestBtn";
import AcceptFriendRequestBtn from "./AcceptFriendRequestBtn";
import DeclineFriendRequestBtn from "./DeclineFriendRequestBtn";
import { cn } from "@/lib/utils";

function FriendRequestListCard({
  friendRequest,
  userId,
  removeFriendRequestFromList,
}: {
  friendRequest: FriendRequest;
  userId: string | undefined;
  removeFriendRequestFromList: (friendRequestId: string) => void;
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
    <Card
      className={cn(
        "px-4 py-4 flex flex-row gap-4 items-center border-none shadow-none"
      )}
    >
      <UserAvatar
        firstName={friendFirstName}
        lastName={friendLastName}
        profileImageUrl={profileImageUrl}
        classes="w-16 h-16 border border-primary"
      />
      <div className="flex flex-col gap-4 items-start flex-grow">
        <p>{friendName}</p>
        <FriendRequestResponseOptions
          {...{
            potentialFriendId,
            userId,
            friendRequestId,
            removeFriendRequestFromList,
          }}
        />
      </div>
    </Card>
  );
}

function FriendRequestResponseOptions({
  potentialFriendId,
  userId,
  friendRequestId,
  removeFriendRequestFromList,
}: {
  potentialFriendId: string;
  userId: string | undefined;
  friendRequestId: string;
  removeFriendRequestFromList: (friendRequestId: string) => void;
}) {
  return (
    <div className="flex flex-row gap-4 items-center justify-start">
      {potentialFriendId === userId ? (
        <CancelFriendRequestBtn
          {...{ friendRequestId, removeFriendRequestFromList }}
        />
      ) : (
        <>
          <AcceptFriendRequestBtn
            {...{ friendRequestId, removeFriendRequestFromList }}
          />
          <DeclineFriendRequestBtn
            {...{ friendRequestId, removeFriendRequestFromList }}
          />
        </>
      )}
    </div>
  );
}

export default FriendRequestListCard;
