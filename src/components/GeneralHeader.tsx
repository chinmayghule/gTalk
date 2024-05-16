"use state";

import { useEffect, useState } from "react";
import SearchConversationBtn from "../app/(tabs)/chat/_components/SearchConversationBtn";
import StartNewConversationBtn from "../app/(tabs)/chat/_components/StartNewConversationBtn";
import { Input } from "@/components/ui/input";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AddNewFriendBtn from "@/app/(tabs)/friends/_components/AddNewFriendBtn";

function GeneralHeader({
  isDesktop,
  searchQuery,
  setSearchQuery,
}: {
  isDesktop: boolean | undefined;
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const currentPath = usePathname();
  const currentActivePath = {
    chat: currentPath === "/chat",
    newChat: currentPath === "/chat/new",
    friends: currentPath === "/friends",
    newFriend: currentPath === "/friends/new",
    profile: currentPath === "/profile",
  };

  // event handlers
  const handleSearchBarToggle = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  // effects.
  // clear searchQuery if search bar has closed.
  useEffect(() => {
    if (setSearchQuery === undefined) return;

    if (!isSearchBarOpen && setSearchQuery) {
      setSearchQuery("");
    }
  }, [isSearchBarOpen, setSearchQuery]);

  // return statements.
  switch (isDesktop) {
    case true: {
      return (
        <header className="px-6 py-4 flex flex-row gap-4 items-center h-[4.5rem]">
          {currentActivePath.newChat && (
            <Link href={"/chat"}>
              <ArrowLeft />
            </Link>
          )}
          {currentActivePath.newFriend && (
            <Link href={"/friends"}>
              <ArrowLeft />
            </Link>
          )}
          <h2 className="text-2xl font-normal mr-auto">
            {currentActivePath.chat && "Chats"}
            {currentActivePath.newChat && "New Chat"}
            {currentActivePath.friends && "Friends"}
            {currentActivePath.newFriend && "New Friend"}
            {currentActivePath.profile && "Profile"}
          </h2>
          {currentActivePath.chat && <StartNewConversationBtn />}
          {currentActivePath.friends && <AddNewFriendBtn />}
        </header>
      );
    }

    case false: {
      return (
        <header
          className={cn(
            "bg-primary text-primary-foreground py-4 pr-4 flex flex-row gap-4 items-center h-[4.5rem] sticky top-0",
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
              {currentActivePath.newFriend && (
                <Link href={"/friends"}>
                  <ArrowLeft />
                </Link>
              )}
              <h2 className="text-2xl font-normal mr-auto">
                {currentActivePath.chat && "Chats"}
                {currentActivePath.newChat && "New Chat"}
                {currentActivePath.friends && "Friends"}
                {currentActivePath.newFriend && "New Friend"}
                {currentActivePath.profile && "Profile"}
              </h2>
              {currentActivePath.chat && <StartNewConversationBtn />}
              {currentActivePath.friends && <AddNewFriendBtn />}
              {!currentActivePath.profile && (
                <SearchConversationBtn onClick={handleSearchBarToggle} />
              )}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (setSearchQuery === undefined) return;

                  setSearchQuery(e.target.value);
                }}
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
