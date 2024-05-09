import { getAllFriendRequests } from "@/lib/helpers";
import { FriendRequest } from "@/types";
import { useEffect, useState } from "react";

export default function useGetAllFriendRequests() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [allFriendRequests, setAllFriendRequests] = useState<
    FriendRequest[] | undefined
  >(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllFriendRequests({ setLoading, setError });
      data && setAllFriendRequests(data?.responseFriendRequests);
      data && setUserId(data?.userId);
    }

    fetchData();
  }, []);

  return { loading, userId, allFriendRequests, setAllFriendRequests, error };
}
