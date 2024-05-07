import { Conversation } from "@/types";
import ChatListCard from "./ChatListCard";

function ChatListFiltered({
  searchQuery,
  allConversations,
}: {
  searchQuery: string;
  allConversations: Conversation[] | undefined;
}) {
  if (allConversations === undefined) return null;

  return (
    <div className="flex flex-col gap-0">
      {filterConversation(allConversations, searchQuery)?.map(
        (conversation: Conversation, index: number) => (
          <ChatListCard
            key={conversation.conversationId || index}
            conversation={conversation}
          />
        )
      )}
    </div>
  );
}

function filterConversation(
  conversations: Conversation[],
  searchQuery: string
) {
  if (searchQuery.length === 0) return conversations;

  return conversations.filter((conversation: Conversation) => {
    // searchQuery should be a substring of firstName or lastName
    const { friendFirstName, friendLastName } = conversation;
    return (
      friendFirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friendLastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
}

export default ChatListFiltered;
