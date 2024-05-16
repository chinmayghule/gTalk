import { cn, formatDateHHMM } from "@/lib/utils";
import { Message } from "@/types";

function MessageBubble({
  message,
  userId,
}: {
  message: Message;
  userId: string | undefined;
}) {
  if (userId === undefined) return null;

  const isSentByUser = message.sender_id === userId;

  const formattedDate = formatDateHHMM(message.timestamp);

  return (
    <div
      className={cn({
        "flex flex-row w-full": true,
        "justify-start": isSentByUser,
        "justify-end": !isSentByUser,
      })}
    >
      {/* container for both the message bubble as well as the time */}
      <div
        className={cn({
          "flex flex-col gap-2": true,
          "items-start mr-[20vw]": isSentByUser,
          "items-end ml-[20vw]": !isSentByUser,
        })}
      >
        <p
          className={cn({
            "text-base lg:text-xl py-2 px-4 first:mt-4 w-fit": true,
            "rounded-tl-xl rounded-bl-xl rounded-br-xl bg-primary text-primary-foreground":
              !isSentByUser,
            "rounded-br-xl rounded-tr-xl rounded-bl-xl bg-primary text-primary-foreground":
              isSentByUser,
          })}
        >
          {message.content}
        </p>
        <p className="text-sm w-fit font-medium">{formattedDate}</p>
      </div>
    </div>
  );
}

export default MessageBubble;
