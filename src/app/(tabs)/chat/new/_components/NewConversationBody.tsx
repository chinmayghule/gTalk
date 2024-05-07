import GeneralSearch from "../../../../../components/GeneralSearch";
import NewConversationList from "./NewConversationList";

function NewConversationBody({
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
      <NewConversationList {...{ searchQuery }} />
    </div>
  );
}

export default NewConversationBody;
