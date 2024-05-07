import { sendFriendRequest, sendUnfriendRequest } from "@/lib/helpers";
import { useState } from "react";

type Response = {
  message: string;
};

export default function useSendUnfriendRequest({
  friendId,
}: {
  friendId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<Response | any>(undefined);

  const initiateUnfriendRequest = async () => {
    const data = (await sendUnfriendRequest({ setLoading, setError, friendId }))
      ?.message;
    setResponse(data);
    setLoading(false);
  };

  return { loading, initiateUnfriendRequest, response, error };
}
