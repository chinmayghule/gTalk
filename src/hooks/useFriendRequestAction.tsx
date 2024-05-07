import { friendRequestAction, getAllFriends } from "@/lib/helpers";
import { Friend } from "@/types";
// import { FriendObject } from "@/types";
import { useCallback, useEffect, useState } from "react";

type FriendRequestAction = string | undefined;

export default function useFriendRequestAction({
  friendRequestId,
  action,
}: {
  friendRequestId: string;
  action: "accept" | "decline";
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<FriendRequestAction>(undefined);

  const performfriendRequestAction = useCallback(async () => {
    const data = await friendRequestAction({
      setLoading,
      setError,
      friendRequestId,
      action,
    });

    data?.message && setResponse(data?.message);
  }, [friendRequestId, action, setLoading, setError]);

  return { loading, performfriendRequestAction, response, error };
}
