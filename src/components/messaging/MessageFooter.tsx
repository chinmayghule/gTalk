"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketClientMessageInfo,
} from "@/types";
import { useConversationId } from "@/contexts/ActiveConversationId";

function MessageFooter({
  socket,
}: {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}) {
  const [message, setMessage] = useState("");
  const { conversationInfo } = useConversationId();
  const { conversationId, conversationDetails } = conversationInfo!;
  const { friendId } = conversationDetails!;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (conversationId === undefined) return;

    const messageInfo: SocketClientMessageInfo = {
      content: message,
      chat_id: conversationId,
      timestamp: new Date().toISOString(),
      friendId: friendId,
    };

    socket.emit("messageToServer", messageInfo);
    setMessage("");
  };

  return (
    <div className="p-6 min-h-[3.5rem] flex-shrink-0 bg-primary text-primary-foreground font-medium text-xl">
      <form onSubmit={onSubmit}>
        <Input
          className="text-black text-lg"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}

export default MessageFooter;
