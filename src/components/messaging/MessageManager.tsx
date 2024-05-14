"use client";

import { useConversationId } from "@/contexts/ActiveConversationId";
import MessageFallback from "./MessageFallback";
import MessageContainer from "./MessageContainer";

function MessageManager() {
  const { conversationInfo } = useConversationId();
  const conversationId = conversationInfo?.conversationId;

  return (
    <div className="min-h-full max-h-screen flex flex-col justify-stretch">
      {conversationId && <MessageContainer {...{ conversationInfo }} />}
      {conversationId === undefined && <MessageFallback />}
    </div>
  );
}

export default MessageManager;
