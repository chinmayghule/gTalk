"use client";

import { useConversationId } from "@/contexts/ActiveConversationId";
import UserAvatar from "../UserAvatar";

function MessageHeader() {
  const { conversationInfo } = useConversationId();
  const conversationDetails = conversationInfo?.conversationDetails;

  if (!conversationDetails) return null;

  const { friendFirstName, friendLastName, profileImageUrl } =
    conversationDetails;

  return (
    <header className="p-4 min-h-[3.5rem] flex-shrink-0 bg-primary text-primary-foreground font-medium flex flex-row gap-4 items-center justify-start">
      <UserAvatar
        {...{
          profileImageUrl,
          firstName: friendFirstName,
          lastName: friendLastName,
        }}
      />

      <h2 className="text-xl font-medium">
        {friendFirstName} {friendLastName}
      </h2>
    </header>
  );
}

export default MessageHeader;
