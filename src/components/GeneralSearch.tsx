import CustomInput from "@/components/CustomInput";
import { Search } from "lucide-react";

function GeneralSearch({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <CustomInput
      startIcon={<Search />}
      placeholder="Search"
      value={searchQuery}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchQuery(e.target.value)
      }
    />
  );
}

export default GeneralSearch;
