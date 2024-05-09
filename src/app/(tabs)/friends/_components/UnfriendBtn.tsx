"use client";

import { Button } from "@/components/ui/button";
import useSendUnfriendRequest from "@/hooks/useSendUnfriendRequest";
import { UserX } from "lucide-react";
import { useEffect } from "react";

function UnfriendBtn({
  friendId,
  removeFriendFromList,
}: {
  friendId: string;
  removeFriendFromList: (friendId: string) => void;
}) {
  const { loading, initiateUnfriendRequest, response, error } =
    useSendUnfriendRequest(friendId);

  const handleSendUnfriendRequest = () => {
    initiateUnfriendRequest();
  };

  useEffect(() => {
    if (response) {
      alert(response);
      removeFriendFromList(friendId);
    }
    if (error) alert(error);
  }, [response, error, removeFriendFromList, friendId]);

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      disabled={loading || Boolean(response)}
      onClick={handleSendUnfriendRequest}
    >
      <UserX className="text-primary hover:scale-110" />
    </Button>
  );
}

export default UnfriendBtn;
