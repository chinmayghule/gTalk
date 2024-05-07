import { sendFriendRequest, startNewConversation } from "@/lib/helpers";
import { useState } from "react";

// type Response = {
//   message: string;
// };

export default function useStartNewConversation({
  participants,
}: {
  participants: string[];
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<any>(undefined);

  const startNewConversationFn = async () => {
    const data = await startNewConversation({
      setLoading,
      setError,
      participants,
    });
    setResponse(data);
    setLoading(false);
  };

  return { loading, startNewConversationFn, response, error };
}
