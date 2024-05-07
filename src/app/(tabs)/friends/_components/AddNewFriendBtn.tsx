import { UserPlus } from "lucide-react";
import Link from "next/link";

function AddNewFriendBtn() {
  return (
    <Link href={"/friends/new"} className="p-2">
      <UserPlus />
    </Link>
  );
}

export default AddNewFriendBtn;
