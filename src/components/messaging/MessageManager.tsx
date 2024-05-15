"use client";

import { useConversationId } from "@/contexts/ActiveConversationId";
import MessageFallback from "./MessageFallback";
import MessageContainer from "./MessageContainer";
import { redirect } from "next/navigation";
import { useViewportSize } from "@/contexts/ViewportSize";

function MessageManager() {
  const { conversationInfo } = useConversationId();
  const { isDesktop } = useViewportSize();

  if (!isDesktop && !conversationInfo) redirect("/chat");

  const conversationId = conversationInfo?.conversationId;

  return (
    <div className="h-screen min-h-screen justify-stretch flex flex-col">
      {conversationId && <MessageContainer {...{ conversationInfo }} />}
      {conversationId === undefined && isDesktop && <MessageFallback />}
    </div>
  );
}

export default MessageManager;
