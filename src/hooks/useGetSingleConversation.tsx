import { getSingleConversation } from "@/lib/helpers";
import { Conversation, Message } from "@/types";
import { useEffect, useState } from "react";

export default function useGetSingleConversation(
  conversationId: string | undefined
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [allMessages, setAllMessages] = useState<Message[] | undefined>(
    undefined
  );
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (conversationId === undefined) return;

    const abort = new AbortController();
    const fetchMessages = async () => {
      const abortSignal = abort.signal;

      const data = await getSingleConversation({
        conversationId,
        abortSignal,
        setLoading,
        setError,
      });
      data && setAllMessages(data?.messages);
      data && setUserId(data?.userId);
    };

    fetchMessages();

    return () => {
      abort.abort();
    };
  }, [conversationId]);

  return { loading, userId, allMessages, setAllMessages, error };
}
