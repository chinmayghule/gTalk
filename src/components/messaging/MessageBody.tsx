import MessageBubble from "@/app/(tabs)/chat/_components/MessageBubble";
import { Message } from "@/types";
import { Atom } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

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
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const isScrolledToBottom = (): boolean => {
    if (chatBodyRef.current === null) return false;

    const { scrollTop, scrollHeight, clientHeight } = chatBodyRef.current;
    return scrollHeight - scrollTop <= clientHeight + 200;
  };

  const scrollToBottom = (): void => {
    if (chatBodyRef.current === null) return;

    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  };

  useLayoutEffect(() => {
    console.log("is isScrolledToBottom: ", isScrolledToBottom());

    if (isScrolledToBottom()) {
      scrollToBottom();
    }
  }, [allMessages]);

  return (
    <div
      ref={chatBodyRef}
      className="flex-grow flex-auto bg-secondary px-4 lg:px-12 py-4 overflow-y-scroll no-scrollbar"
    >
      {loading && (
        <div className="h-full grid place-items-center text-black">
          <Atom className="animate-spin text-secondary-foreground" size={64} />
        </div>
      )}
      {error && <div>{error}</div>}
      {!loading &&
        !error &&
        allMessages &&
        allMessages.length > 0 &&
        allMessages?.map((message: Message, index: number) => (
          <MessageBubble key={index} {...{ message, userId }} />
        ))}
      {allMessages && allMessages.length === 0 && null}
    </div>
  );
}

export default MessageBody;
