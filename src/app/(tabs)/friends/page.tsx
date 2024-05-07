"use client";

import TabBody from "@/components/tab-container/TabBody";
import TabHeader from "@/components/tab-container/TabHeader";
import { useState } from "react";
import { useViewportSize } from "@/contexts/ViewportSize";
import GeneralHeader from "../../../components/GeneralHeader";
import FriendBody from "./_components/FriendBody";

function Chat() {
  const [searchQuery, setSearchQuery] = useState("");

  const { isDesktop } = useViewportSize();

  return (
    <>
      <TabHeader {...{ isDesktop }}>
        <GeneralHeader {...{ isDesktop, searchQuery, setSearchQuery }} />
      </TabHeader>
      <TabBody>
        <FriendBody {...{ isDesktop, searchQuery, setSearchQuery }} />
      </TabBody>
    </>
  );
}

export default Chat;
