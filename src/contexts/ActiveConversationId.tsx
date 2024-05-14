"use client";

import { useState, createContext, useContext } from "react";

export type ConversationDetails = {
  friendId: string;
  friendFirstName: string;
  friendLastName: string;
  profileImageUrl: string | undefined;
};

export type ConversationInfo = {
  conversationId: string | undefined;
  conversationDetails: ConversationDetails | undefined;
};

export type ConversationInfoContext = {
  conversationInfo: ConversationInfo | undefined;
  setConversationInfo: React.Dispatch<
    React.SetStateAction<ConversationInfo | undefined>
  >;
};

export const ConversationIdContext = createContext<
  ConversationInfoContext | undefined
>(undefined);

export const ConversationIdProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [conversationInfo, setConversationInfo] = useState<
    ConversationInfo | undefined
  >(undefined);

  return (
    <ConversationIdContext.Provider
      value={{ conversationInfo, setConversationInfo }}
    >
      {children}
    </ConversationIdContext.Provider>
  );
};

export const useConversationId = (): ConversationInfoContext => {
  const context = useContext(ConversationIdContext);
  if (context === undefined) {
    throw new Error(
      "useConversationId must be used within a ConversationIdProvider"
    );
  }

  return context;
};
