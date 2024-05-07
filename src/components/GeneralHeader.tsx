"use state";

import { useState } from "react";
import SearchConversationBtn from "../app/(tabs)/chat/_components/SearchConversationBtn";
import StartNewConversationBtn from "../app/(tabs)/chat/_components/StartNewConversationBtn";
import { Input } from "@/components/ui/input";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

function GeneralHeader({
  isDesktop,
  searchQuery,
  setSearchQuery,
}: {
  isDesktop: boolean | undefined;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const currentPath = usePathname();
  const currentActivePath = {
    chat: currentPath === "/chat",
    newChat: currentPath === "/chat/new",
    friends: currentPath === "/friends",
    profile: currentPath === "/profile",
  };

  // event handlers
  const handleSearchBarToggle = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  switch (isDesktop) {
    case true: {
      return (
        <header className="px-6 py-4 flex flex-row gap-4 items-center h-[4.5rem]">
          {currentActivePath.newChat && (
            <Link href={"/chat"}>
              <ArrowLeft />
            </Link>
          )}
          <h2 className="text-2xl font-normal mr-auto">
            {currentActivePath.chat && "Chats"}
            {currentActivePath.newChat && "New Chat"}
            {currentActivePath.friends && "Friends"}
            {currentActivePath.profile && "Profile"}
          </h2>
          {currentActivePath.chat && <StartNewConversationBtn />}
        </header>
      );
    }

    case false: {
      return (
        <header
          className={cn(
            "bg-primary text-primary-foreground py-4 pr-4 flex flex-row gap-4 items-center",
            !isSearchBarOpen && "pl-4",
            isSearchBarOpen && "pl-2"
          )}
        >
          {!isSearchBarOpen ? (
            <>
              {currentActivePath.newChat && (
                <Link href={"/chat"}>
                  <ArrowLeft />
                </Link>
              )}
              <h2 className="text-2xl font-normal mr-auto">
                {currentActivePath.chat && "Chats"}
                {currentActivePath.newChat && "New Chat"}
                {currentActivePath.friends && "Friends"}
                {currentActivePath.profile && "Profile"}
              </h2>
              {currentActivePath.chat && <StartNewConversationBtn />}
              <SearchConversationBtn onClick={handleSearchBarToggle} />
            </>
          ) : (
            <div className="flex flex-row gap-2 w-full animate-width-zero-to-full">
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={handleSearchBarToggle}
              >
                <X />
              </Button>
              <Input
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search"
                className="text-base flex-grow text-foreground"
              />
            </div>
          )}
        </header>
      );
    }

    default: {
      return null;
    }
  }
}

export default GeneralHeader;
