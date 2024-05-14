import MessageBubble from "@/app/(tabs)/chat/_components/MessageBubble";
import { Message } from "@/types";

function MessageBody({
  loading,
  error,
  userId,
  allMessages,
}: {
  loading: boolean;
  error: string | undefined;
  userId: string | undefined;
  allMessages: Message[] | undefined;
}) {
  if (userId === undefined) return null;

  return (
    <div className="flex-grow bg-secondary px-12 py-4 overflow-y-scroll no-scrollbar">
      {loading && <div className="text-2xl">Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <>
          {allMessages?.map((message: Message, index: number) => (
            <MessageBubble key={index} {...{ message, userId }} />
          ))}
        </>
      )}
    </div>
  );
}

export default MessageBody;
