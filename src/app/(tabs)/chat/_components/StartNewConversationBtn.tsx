import { MessageSquarePlus } from "lucide-react";
import Link from "next/link";

function StartNewConversationBtn() {
  return (
    <Link href={"/chat/new"} className="p-2">
      <MessageSquarePlus />
    </Link>
  );
}

export default StartNewConversationBtn;
