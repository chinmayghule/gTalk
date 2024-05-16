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

  const socket = useSocket();

  // effects.
  // listen for incoming message event.
  // cleanup for socket when component unmounts.
  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (data: any) => {
      const timestampString = data.timestamp;

      if (allMessages === undefined) return;

      // setAllMessages((prevState) => {
      //   if (prevState === undefined) return [];

      //   return [
      //     ...prevState,
      //     {
      //       ...data,
      //       messageId: timestampString,
      //       content: data.content,
      //       timestamp: new Date(data.timestamp),
      //       sender_id: data.sender_id,
      //       chat_id: data.chat_id,
      //       deleted_by: [],
      //     },
      //   ];
      // });
      addNewMessage({
        messageId: timestampString,
        messageInfo: data,
        allMessages,
        setAllMessages,
      });
    };

    if (conversationId === undefined) return;

    socket.emit("joinRoom", conversationId);
    socket.on("messageFromServer", handleIncomingMessage);

    () => {
      socket.off("messageFromServer", handleIncomingMessage);
    };
  }, [socket, conversationId]);

  // re-render if userId is changed.
  useEffect(() => {}, [userId]);

  return (
    <>
      <MessageHeader />
      <MessageBody {...{ loading, error, userId, allMessages }} />
      <MessageFooter {...{ socket }} />
    </>
  );
}

function addNewMessage({
  messageId,
  messageInfo,
  allMessages,
  setAllMessages,
}: {
  messageId: string;
  messageInfo: any;
  allMessages: any;
  setAllMessages: any;
}) {
  if (allMessages === undefined) return;

  const message = allMessages.find(
    (messageObj: any) => messageObj.messageId === messageId
  );

  if (message) return;

  setAllMessages((prevState: any) => {
    if (prevState === undefined) return [];
    return [...prevState, messageInfo];
  });
}

export default MessageContainer;
