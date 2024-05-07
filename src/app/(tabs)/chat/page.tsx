"use client";

import TabBody from "@/components/tab-container/TabBody";
import TabHeader from "@/components/tab-container/TabHeader";
import ChatBody from "./_components/ChatBody";
import { useState } from "react";
import { useViewportSize } from "@/contexts/ViewportSize";
import GeneralHeader from "../../../components/GeneralHeader";

function Chat() {
  const [searchQuery, setSearchQuery] = useState("");

  const { isDesktop } = useViewportSize();

  return (
    <>
      <TabHeader {...{ isDesktop }}>
        <GeneralHeader {...{ isDesktop, searchQuery, setSearchQuery }} />
      </TabHeader>
      <TabBody>
        <ChatBody {...{ isDesktop, searchQuery, setSearchQuery }} />
      </TabBody>
    </>
  );
}

export default Chat;
