"use client";

import useGetSingleConversation from "@/hooks/useGetSingleConversation";
import MessageHeader from "./MessageHeader";
import MessageBody from "./MessageBody";
import MessageFooter from "./MessageFooter";
import { useEffect, useState } from "react";
import { ConversationInfo } from "@/contexts/ActiveConversationId";
import { useSocket } from "@/contexts/SocketContext";

function MessageContainer({
  conversationInfo,
}: {
  conversationInfo: ConversationInfo | undefined;
}) {
  const [forceUpdate, setForceUpdate] = useState(0);

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

    return () => {
      socket.off("messageFromServer", handleIncomingMessage);
    };
  }, [socket, conversationId, allMessages, setAllMessages]);

  // re-render if userId is changed.
  useEffect(() => {}, [userId]);

  // force update if container size changes.
  // for toggling of virtual keyboard on mobile.
  useEffect(() => {
    const handleResize = () => {
      // Trigger a re-render when the keyboard is shown or hidden
      setForceUpdate((prev) => prev + 1);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
