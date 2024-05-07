import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function SearchConversationBtn({ onClick }: { onClick: () => void }) {
  return (
    <Button variant={"ghost"} size={"icon"} onClick={onClick}>
      <Search />
    </Button>
  );
}

export default SearchConversationBtn;
