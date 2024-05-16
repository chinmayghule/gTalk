import { getAllFriends } from "@/lib/helpers";
import { Friend } from "@/types";
import { useEffect, useState } from "react";

export default function useGetAllFriends() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [allFriends, setAllFriends] = useState<Friend[] | undefined>(undefined);

  const refreshFriendsList = async () => {
    const data = (await getAllFriends({ setLoading, setError }))?.friends;
    setAllFriends(data);
  };

  useEffect(() => {
    refreshFriendsList();
  }, []);

  return { loading, allFriends, setAllFriends, refreshFriendsList, error };
}
