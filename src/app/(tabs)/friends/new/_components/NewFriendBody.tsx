import GeneralSearch from "../../../../../components/GeneralSearch";
import NewFriendList from "./NewFriendList";

function NewFriendBody({
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
      <NewFriendList {...{ searchQuery }} />
    </div>
  );
}

export default NewFriendBody;
