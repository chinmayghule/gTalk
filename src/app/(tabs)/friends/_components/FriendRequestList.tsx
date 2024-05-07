import useGetAllFriendRequests from "@/hooks/useGetAllFriendRequests";
import FriendRequestListCard from "./FriendRequestListCard";
import { FriendRequest } from "@/types";

function FriendRequestList() {
  const { loading, userId, allFriendRequests, error } =
    useGetAllFriendRequests();

  if (!allFriendRequests || allFriendRequests.length === 0) return null;

  return (
    <div className="bg-blue-200">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {allFriendRequests && allFriendRequests.length > 0 && (
        <h3 className="text-xl font-foreground font-regular">
          Friend Requests
        </h3>
      )}
      {allFriendRequests &&
        allFriendRequests?.map((friendRequest: FriendRequest) => (
          <FriendRequestListCard
            key={friendRequest.friendRequestId}
            {...{ friendRequest }}
          />
        ))}
    </div>
  );
}

export default FriendRequestList;
