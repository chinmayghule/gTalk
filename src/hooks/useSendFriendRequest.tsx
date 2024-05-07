import { sendFriendRequest } from "@/lib/helpers";
import { useState } from "react";

type Response = {
  message: string;
};

export default function useSendFriendRequest({
  receiverId,
}: {
  receiverId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<Response | any>(undefined);

  const initiateFriendRequest = async () => {
    const data = (await sendFriendRequest({ setLoading, setError, receiverId }))
      ?.message;
    setResponse(data);
    setLoading(false);
  };

  return { loading, initiateFriendRequest, response, error };
}
