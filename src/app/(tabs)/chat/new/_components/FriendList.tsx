import { Friend } from "@/types";
import FriendListCard from "./FriendListCard";
import { Card } from "@/components/ui/card";
import CardLoading from "@/components/CardLoading";

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
      {loading && (
        <>
          <CardLoading />
          <CardLoading />
          <CardLoading />
          <CardLoading />
        </>
      )}
      {error && (
        <Card className="border-none shadow-none py-4 px-8 text-left text-xl bg-destructive text-primary-foreground font-semibold">
          {error}
        </Card>
      )}
      {!loading &&
        !error &&
        allFriends &&
        filterFriends(allFriends, searchQuery)?.map(
          (friend: Friend, index: number) => (
            <FriendListCard
              key={friend.friendId || index}
              friendId={friend.friendId}
              friendProfileImageUrl={friend.profileImageUrl}
              friendFirstName={friend.firstName}
              friendLastName={friend.lastName}
              friendEmail={friend.email}
            />
          )
        )}
      {!loading && !error && allFriends && allFriends.length === 0 && (
        <Card className="border-none shadow-none p-4 text-center text-xl bg-secondary">
          Add friends to see them here.
        </Card>
      )}
    </div>
  );
}

function filterFriends(friends: Friend[], searchQuery: string) {
  if (searchQuery.length === 0) return friends;

  return friends.filter((friend: Friend) => {
    // searchQuery should be a substring of firstName or lastName
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
