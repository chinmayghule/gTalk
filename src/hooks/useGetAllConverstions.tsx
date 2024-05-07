import { getAllConversations } from "@/lib/helpers";
import { Conversation } from "@/types";
import { useEffect, useState } from "react";

export default function useGetAllConversations() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [allConversations, setAllConversations] = useState<
    Conversation[] | undefined
  >(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchConversations() {
      const data = await getAllConversations({ setLoading, setError });
      data && setAllConversations(data?.chats);
      data && setUserId(data?.userId);
    }

    fetchConversations();
  }, []);

  return { loading, userId, allConversations, error };
}
