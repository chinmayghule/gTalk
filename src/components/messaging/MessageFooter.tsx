"use client";

import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketClientMessageInfo,
} from "@/types";
import { useConversationId } from "@/contexts/ActiveConversationId";
import { useViewportSize } from "@/contexts/ViewportSize";
import { Button } from "../ui/button";
import { SendHorizontal } from "lucide-react";

function MessageFooter({
  socket,
}: {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
}) {
  const [message, setMessage] = useState("");
  const { conversationInfo } = useConversationId();
  const { conversationId, conversationDetails } = conversationInfo!;
  const { friendId } = conversationDetails!;
  const { isDesktop } = useViewportSize();

  const messageInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (conversationId === undefined) return;
    if (!socket) return;
    if (message.length === 0) return;

    const messageInfo: SocketClientMessageInfo = {
      content: message,
      chat_id: conversationId,
      timestamp: new Date().toISOString(),
      friendId: friendId,
    };

    socket.emit("messageToServer", messageInfo);
    setMessage("");

    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  };

  return (
    <div className="px-4 lg:px-12 py-4 min-h-[3.5rem] flex-shrink-0 bg-primary text-primary-foreground font-medium text-xl mt-auto">
      <form onSubmit={onSubmit} className="flex flex-row gap-4 items-center">
        <Input
          className="text-black text-lg"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={messageInputRef}
        />
        {!isDesktop && <SubmitMessageBtn />}
      </form>
    </div>
  );
}

function SubmitMessageBtn() {
  return (
    <Button
      type="submit"
      variant={"ghost"}
      size={"icon"}
      className="bg-secondary text-secondary-foreground"
    >
      <SendHorizontal />
    </Button>
  );
}

export default MessageFooter;
