import UserAvatar from "@/components/UserAvatar";
import { Card } from "@/components/ui/card";
import { Conversation } from "@/types";

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

  return (
    <Card className="px-2 py-4 flex flex-row gap-4 items-center border-none shadow-none hover:bg-gray-100">
      <UserAvatar
        firstName={friendFirstName}
        lastName={friendLastName}
        profileImageUrl={friendProfileImageUrl}
        classes="w-16 h-16 border border-primary"
      />
      <div className="flex flex-col gap-0 items-start">
        <p>{friendName}</p>
        <p>{lastMessage}</p>
      </div>
    </Card>
  );
}

export default ChatListCard;
