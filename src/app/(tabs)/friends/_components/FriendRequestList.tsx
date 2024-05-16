import useGetAllFriendRequests from "@/hooks/useGetAllFriendRequests";
import FriendRequestListCard from "./FriendRequestListCard";
import { FriendRequest } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function FriendRequestList() {
  const { loading, userId, allFriendRequests, setAllFriendRequests, error } =
    useGetAllFriendRequests();

  const [showFriendRequests, setShowFriendRequests] = useState(true);

  // function to remove a particular friend request from the list
  // based on the friendRequestId
  const removeFriendRequestFromList = (friendRequestId: string) => {
    const newFriendRequests = allFriendRequests?.filter(
      (friendRequest: FriendRequest) =>
        friendRequest.friendRequestId !== friendRequestId
    );
    setAllFriendRequests(newFriendRequests);
  };

  if (!allFriendRequests || allFriendRequests.length === 0) return null;

  return (
    <div className="bg-blue-200 p-4 flex flex-col gap-2 rounded-lg mt-4">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {allFriendRequests && allFriendRequests.length > 0 && (
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-xl font-foreground font-medium">
            Friend Requests
          </h3>
          <Button
            variant={"outline"}
            onClick={() => setShowFriendRequests((prevState) => !prevState)}
            className="grid place-items-center text-base font-regular"
          >
            {showFriendRequests ? "Hide" : "Show"}
          </Button>
        </div>
      )}
      {userId &&
        showFriendRequests &&
        allFriendRequests &&
        allFriendRequests?.map((friendRequest: FriendRequest) => (
          <FriendRequestListCard
            key={friendRequest.friendRequestId}
            {...{ friendRequest, userId, removeFriendRequestFromList }}
          />
        ))}
      {userId === undefined && allFriendRequests && (
        <div className="text-base font-medium p-4 bg-destructive text-destructive-foreground text-left rounded-md">
          There was some problem with getting your friend requests. Please try
          refreshing the page.
        </div>
      )}
    </div>
  );
}

export default FriendRequestList;
