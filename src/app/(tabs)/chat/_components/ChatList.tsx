import { Conversation } from "@/types";
import ChatListLoading from "./ChatListLoading";
import ChatListError from "./ChatListError";
import ChatListFiltered from "./ChatListFiltered";

function ChatList({
  loading,
  userId,
  allConversations,
  error,
  searchQuery,
}: {
  loading: boolean;
  userId: string | undefined;
  allConversations: Conversation[] | undefined;
  error: string | undefined;
  searchQuery: string;
}) {
  return (
    <>
      {loading && <ChatListLoading />}
      {error && <ChatListError {...{ error }} />}
      {!loading && !error && (
        <ChatListFiltered {...{ searchQuery, allConversations }} />
      )}
    </>
  );
}

export default ChatList;
