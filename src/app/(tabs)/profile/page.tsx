"use client";

import TabBody from "@/components/tab-container/TabBody";
import TabHeader from "@/components/tab-container/TabHeader";
import { useViewportSize } from "@/contexts/ViewportSize";
import GeneralHeader from "../../../components/GeneralHeader";
import ProfileBody from "./_components/ProfileBody";

function Profile() {
  const { isDesktop } = useViewportSize();

  return (
    <>
      <TabHeader {...{ isDesktop }}>
        <GeneralHeader {...{ isDesktop }} />
      </TabHeader>
      <TabBody>
        <ProfileBody />
      </TabBody>
    </>
  );
}

export default Profile;
