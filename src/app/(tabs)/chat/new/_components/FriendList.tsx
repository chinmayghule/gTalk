import { Friend } from "@/types";
import FriendListCard from "./FriendListCard";

function FriendList({
  searchQuery,
  loading,
  allFriends,
  error,
}: {
  searchQuery: string;
  loading: boolean;
  allFriends: Friend[] | undefined;
  error: string | undefined;
}) {
  return (
    <div className="flex flex-col gap-1">
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading &&
        !error &&
        allFriends &&
        allFriends?.map((friend: Friend, index: number) => (
          <FriendListCard
            key={friend.friendId || index}
            friendId={friend.friendId}
            friendProfileImageUrl={friend.profileImageUrl}
            friendFirstName={friend.firstName}
            friendLastName={friend.lastName}
            friendEmail={friend.email}
          />
        ))}
    </div>
  );
}

export default FriendList;
