import { startNewConversation } from "@/lib/helpers";
import { useState } from "react";

export default function useStartNewConversation(participants: string[]) {
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
