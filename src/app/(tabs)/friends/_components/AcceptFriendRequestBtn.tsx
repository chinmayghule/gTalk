"use client";

import { Button } from "@/components/ui/button";
import useFriendRequestAction from "@/hooks/useFriendRequestAction";
import { useEffect } from "react";

export default function AcceptFriendRequestBtn({
  friendRequestId,
  removeFriendRequestFromList,
}: {
  friendRequestId: string;
  removeFriendRequestFromList: (friendRequestId: string) => void;
}) {
  const { loading, performFriendRequestAction, response, error } =
    useFriendRequestAction({ friendRequestId, action: "accept" });

  // event handlers.
  const handleCancelRequest = () => {
    performFriendRequestAction();
  };

  // effects.
  useEffect(() => {
    if (response) {
      alert(response);
      removeFriendRequestFromList(friendRequestId);
    }
    if (error) alert(error);
  }, [response, error, removeFriendRequestFromList, friendRequestId]);
  return (
    <Button
      variant={"default"}
      className="font-semibold"
      onClick={handleCancelRequest}
      disabled={loading || Boolean(response)}
    >
      Accept
    </Button>
  );
}
