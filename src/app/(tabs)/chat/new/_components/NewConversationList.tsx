import useGetAllFriends from "@/hooks/useGetAllFriends";
import FriendList from "./FriendList";

function NewConversationList({ searchQuery }: { searchQuery: string }) {
  const { loading, allFriends, error } = useGetAllFriends();

  return (
    <div className="flex flex-col gap-0">
      <FriendList {...{ searchQuery, loading, allFriends, error }} />
    </div>
  );
}

export default NewConversationList;
