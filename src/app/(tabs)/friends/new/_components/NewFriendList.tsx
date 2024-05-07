import useGetAllPotentialFriends from "@/hooks/useGetPotentialFriends";
import PotentialFriendsList from "./PotentialFriendsList";
import useDebounce from "@/hooks/useDebounce";

function NewFriendList({ searchQuery }: { searchQuery: string }) {
  const debounceDelayInMilliseconds = 1000;
  const debouncedSearchQuery = useDebounce<string>(
    searchQuery,
    debounceDelayInMilliseconds
  );

  const { loading, userId, allPotentialFriends, error } =
    useGetAllPotentialFriends(debouncedSearchQuery);

  return (
    <div className="flex flex-col gap-0">
      <PotentialFriendsList
        {...{ searchQuery, loading, allPotentialFriends, error }}
      />
    </div>
  );
}

export default NewFriendList;
