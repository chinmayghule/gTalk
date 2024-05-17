"use client";

import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { useConversationId } from "@/contexts/ActiveConversationId";
import { useViewportSize } from "@/contexts/ViewportSize";
import { Conversation } from "@/types";
import { useRouter } from "next/navigation";

function ChatListCard({ conversation }: { conversation: Conversation }) {
  const {
    conversationId,
    friendId,
    lastMessage,
    lastMessageTime,
    friendProfileImageUrl,
    friendFirstName,
    friendLastName,
  } = conversation;

  const friendName = `${friendFirstName} ${friendLastName}`;

  const { conversationInfo, setConversationInfo } = useConversationId();
  const { isDesktop } = useViewportSize();
  const router = useRouter();

  const handleChatListCardClick = () => {
    setConversationInfo({
      ...conversationInfo,
      conversationId: conversationId,
      conversationDetails: {
        friendId: friendId,
        friendFirstName: friendFirstName,
        friendLastName: friendLastName,
        profileImageUrl: friendProfileImageUrl,
      },
    });

    if (!isDesktop) {
      console.log("redirecting...");
      router.push("/chat/activeChat");
    }
  };

  return (
    <Button
      variant={"ghost"}
      onClick={handleChatListCardClick}
      className="px-2 py-4 flex flex-row gap-4 justify-start items-center border-none shadow-none hover:bg-gray-100 h-fit"
    >
      <UserAvatar
        firstName={friendFirstName}
        lastName={friendLastName}
        profileImageUrl={friendProfileImageUrl}
        classes="w-16 h-16 border border-primary"
      />
      <div className="flex flex-col gap-0 items-start">
        <p className="text-lg font-medium">{friendName}</p>
        <p>{lastMessage}</p>
      </div>
    </Button>
  );
}

export default ChatListCard;
