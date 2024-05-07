import { getPotentialFriends } from "@/lib/helpers";
import { PotentialFriend } from "@/types";
import { useEffect, useState } from "react";

export default function useGetAllPotentialFriends(query: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [allPotentialFriends, setAllPotentialFriends] = useState<
    PotentialFriend[] | undefined
  >(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const data = await getPotentialFriends({ query, setLoading, setError });
      data && setAllPotentialFriends(data?.users);
      data && setUserId(data?.userId);
    }

    fetchData();
  }, [query]);

  return { loading, userId, allPotentialFriends, error };
}
