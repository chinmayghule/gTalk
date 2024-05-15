"use client";

import useGetSingleConversation from "@/hooks/useGetSingleConversation";
import MessageHeader from "./MessageHeader";
import MessageBody from "./MessageBody";
import MessageFooter from "./MessageFooter";
import { useEffect } from "react";
import { ConversationInfo } from "@/contexts/ActiveConversationId";
import MessageFallback from "./MessageFallback";
import { useSocket } from "@/contexts/SocketContext";

function MessageContainer({
  conversationInfo,
}: {
  conversationInfo: ConversationInfo | undefined;
}) {
  let conversationId: string | undefined;

  if (conversationInfo) {
    conversationId = conversationInfo.conversationId;
  }

  const { loading, userId, allMessages, setAllMessages, error } =
    useGetSingleConversation(conversationId);

  // const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(
  //   io(process.env.NEXT_PUBLIC_BASE_API_URL!, {
  //     withCredentials: true,
  //   })
  // );

  // const socket = useMemo(() => {
  //   return socketRef.current;
  // }, [socketRef]);

  const socket = useSocket();

  // effects.
  // listen for incoming message event.
  // cleanup for socket when component unmounts.
  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (data: any) => {
      const randomUUID = crypto.randomUUID();

      if (allMessages === undefined) return;

      setAllMessages([
        ...allMessages,
        {
          ...data,
          messageId: randomUUID,
          content: data.content,
          timestamp: new Date(data.timestamp),
          sender_id: data.sender_id,
          chat_id: data.chat_id,
          deleted_by: [],
        },
      ]);
    };

    if (conversationId === undefined) return;

    socket.emit("joinRoom", conversationId);
    socket.on("messageFromServer", handleIncomingMessage);

    () => {
      socket.off("messageFromServer", handleIncomingMessage);
    };
  }, [socket, conversationId, allMessages, setAllMessages]);

  // re-render if userId is changed.
  useEffect(() => {}, [userId]);

  if (userId === undefined) return <MessageFallback />;

  return (
    <>
      <MessageHeader />
      <MessageBody {...{ loading, error, userId, allMessages }} />
      <MessageFooter {...{ socket }} />
    </>
  );
}

export default MessageContainer;
