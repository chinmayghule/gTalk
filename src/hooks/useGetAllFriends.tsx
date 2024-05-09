import { getAllFriends } from "@/lib/helpers";
import { Friend } from "@/types";
import { useEffect, useState } from "react";

export default function useGetAllFriends() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [allFriends, setAllFriends] = useState<Friend[] | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const data = (await getAllFriends({ setLoading, setError }))?.friends;
      setAllFriends(data);
    }

    fetchData();
  }, []);

  return { loading, allFriends, setAllFriends, error };
}
