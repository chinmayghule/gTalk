"use client";

import GeneralSearch from "@/components/GeneralSearch";
import FriendRequestList from "@/app/(tabs)/friends/_components/FriendRequestList";
import FriendList from "@/app/(tabs)/friends/_components/FriendList";

function FriendBody({
  isDesktop,
  searchQuery,
  setSearchQuery,
}: {
  isDesktop: boolean | undefined;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  if (isDesktop === undefined) return null;

  return (
    <div className="flex flex-col gap-4">
      {isDesktop && <GeneralSearch {...{ searchQuery, setSearchQuery }} />}
      <FriendRequestList />
      <FriendList {...{ searchQuery, setSearchQuery }} />
    </div>
  );
}

export default FriendBody;
