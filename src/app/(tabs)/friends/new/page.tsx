"use client";

import TabBody from "@/components/tab-container/TabBody";
import TabHeader from "@/components/tab-container/TabHeader";
import { useViewportSize } from "@/contexts/ViewportSize";
import { useState } from "react";
import GeneralHeader from "../../../../components/GeneralHeader";
import NewFriendBody from "./_components/NewFriendBody";

function NewConversation() {
  const [searchQuery, setSearchQuery] = useState("");

  const { isDesktop } = useViewportSize();

  return (
    <>
      <TabHeader {...{ isDesktop }}>
        <GeneralHeader {...{ isDesktop, searchQuery, setSearchQuery }} />
      </TabHeader>
      <TabBody>
        <NewFriendBody {...{ isDesktop, searchQuery, setSearchQuery }} />
      </TabBody>
    </>
  );
}

export default NewConversation;
