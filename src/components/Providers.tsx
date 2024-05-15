// this is a wrapper for all providers.

import { ConversationIdProvider } from "@/contexts/ActiveConversationId";
import { SocketProvider } from "@/contexts/SocketContext";
import { ViewportSizeProvider } from "@/contexts/ViewportSize";
import React from "react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ViewportSizeProvider>
      <ConversationIdProvider>
        <SocketProvider>{children}</SocketProvider>
      </ConversationIdProvider>
    </ViewportSizeProvider>
  );
}

export default Providers;
