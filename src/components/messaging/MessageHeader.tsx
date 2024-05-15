"use client";

import { useConversationId } from "@/contexts/ActiveConversationId";
import UserAvatar from "../UserAvatar";
import { useViewportSize } from "@/contexts/ViewportSize";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function MessageHeader() {
  const { conversationInfo } = useConversationId();
  const conversationDetails = conversationInfo?.conversationDetails;

  const { isDesktop } = useViewportSize();

  if (!conversationDetails) return null;

  const { friendFirstName, friendLastName, profileImageUrl } =
    conversationDetails;

  return (
    <header className="px-2 lg:px-4 py-4 min-h-[3.5rem] flex-shrink-0 bg-primary text-primary-foreground font-medium flex flex-row gap-0 items-center justify-start">
      {!isDesktop && (
        <Link href={"/chat"}>
          <ArrowLeft />
        </Link>
      )}

      <div className="ml-2">
        <UserAvatar
          {...{
            profileImageUrl,
            firstName: friendFirstName,
            lastName: friendLastName,
          }}
        />
      </div>

      <h2 className="text-xl font-medium ml-4">
        {friendFirstName} {friendLastName}
      </h2>
    </header>
  );
}

export default MessageHeader;
