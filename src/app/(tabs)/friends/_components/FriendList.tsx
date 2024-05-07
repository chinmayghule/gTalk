import useGetAllFriends from "@/hooks/useGetAllFriends";
import { Friend } from "@/types";
import FriendListCard from "./FriendListCard";

function FriendList({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { loading, allFriends, error } = useGetAllFriends();

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {allFriends &&
        filterFriendList(allFriends, searchQuery)?.map(
          (friend: Friend, index: number) => (
            <FriendListCard key={friend.friendId || index} {...{ friend }} />
          )
        )}
    </div>
  );
}

function filterFriendList(friends: Friend[], searchQuery: string) {
  if (searchQuery.length === 0) return friends;

  return friends.filter((friend: Friend) => {
    // search by friendId, first name, last name, or email
    const { friendId, firstName, lastName, email } = friend;
    return (
      friendId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
}

export default FriendList;
