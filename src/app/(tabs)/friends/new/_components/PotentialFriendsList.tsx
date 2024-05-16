import { PotentialFriend } from "@/types";
import PotentialFriendListCard from "./PotentialFriendListCard";
import CardLoading from "@/components/CardLoading";

function PotentialFriendsList({
  searchQuery,
  loading,
  allPotentialFriends,
  error,
}: {
  searchQuery: string;
  loading: boolean;
  allPotentialFriends: PotentialFriend[] | undefined;
  error: string | undefined;
}) {
  return (
    <div className="flex flex-col gap-1">
      {loading && (
        <div>
          <CardLoading />
          <CardLoading />
          <CardLoading />
          <CardLoading />
        </div>
      )}
      {error && <div>{error}</div>}
      {!loading &&
        !error &&
        allPotentialFriends &&
        allPotentialFriends?.map(
          (potentialFriend: PotentialFriend, index: number) => (
            <PotentialFriendListCard
              key={index}
              _id={potentialFriend._id}
              profileImageUrl={potentialFriend.profileImageUrl}
              firstName={potentialFriend.firstName}
              lastName={potentialFriend.lastName}
              email={potentialFriend.email}
            />
          )
        )}
      {!loading &&
        !error &&
        allPotentialFriends?.length === 0 &&
        searchQuery.length > 0 && <NotFoundMessage />}

      {!loading && !error && allPotentialFriends === undefined && (
        <IntroMessage />
      )}
    </div>
  );
}

function NotFoundMessage() {
  return (
    <div className="text-center py-4 px-0 text-xl">
      No users found. Try something else.
    </div>
  );
}

function IntroMessage() {
  return (
    <div className="py-4 px-6 text-xl">
      <ol className="list-decimal leading-10">
        <li>Search for others.</li>
        <li>Send them friend request.</li>
        <li>If they accept, you&#39;re friends!</li>
      </ol>
    </div>
  );
}

export default PotentialFriendsList;
