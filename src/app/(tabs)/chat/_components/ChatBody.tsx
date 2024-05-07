"use client";

import ChatList from "./ChatList";
import GeneralSearch from "../../../../components/GeneralSearch";
import useGetAllConversations from "@/hooks/useGetAllConverstions";

function ChatBody({
  isDesktop,
  searchQuery,
  setSearchQuery,
}: {
  isDesktop: boolean | undefined;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { loading, userId, allConversations, error } = useGetAllConversations();

  if (isDesktop === undefined) return null;

  return (
    <div className="flex flex-col gap-4">
      {isDesktop && <GeneralSearch {...{ searchQuery, setSearchQuery }} />}
      <ChatList
        {...{ loading, userId, allConversations, error, searchQuery }}
      />
    </div>
  );
}

export default ChatBody;
