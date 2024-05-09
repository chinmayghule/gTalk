"use client";

import { Button } from "@/components/ui/button";
import useFriendRequestAction from "@/hooks/useFriendRequestAction";
import { useEffect } from "react";

export default function CancelFriendRequestBtn({
  friendRequestId,
  removeFriendRequestFromList,
}: {
  friendRequestId: string;
  removeFriendRequestFromList: (friendRequestId: string) => void;
}) {
  const { loading, performFriendRequestAction, response, error } =
    useFriendRequestAction({ friendRequestId, action: "decline" });

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
      variant={"destructive"}
      className="font-semibold"
      disabled={loading || Boolean(response)}
      onClick={handleCancelRequest}
    >
      Cancel Request
    </Button>
  );
}
