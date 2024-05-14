"use client";

import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { useConversationId } from "@/contexts/ActiveConversationId";
import useStartNewConversation from "@/hooks/useStartNewConversation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function FriendListCard({
  friendId,
  friendProfileImageUrl,
  friendFirstName,
  friendLastName,
  friendEmail,
}: {
  friendId: string;
  friendProfileImageUrl: string | undefined;
  friendFirstName: string;
  friendLastName: string;
  friendEmail: string;
}) {
  const friendName = `${friendFirstName} ${friendLastName}`;

  const { loading, startNewConversationFn, response, error } =
    useStartNewConversation([friendId]);

  const { conversationInfo, setConversationInfo } = useConversationId();

  const router = useRouter();

  // event handlers.
  const handleFriendCardClick = (friendId: string) => {
    startNewConversationFn();
  };

  // effects.
  // actions for when a new conversation has been created.
  useEffect(() => {
    if (response) {
      alert("New conversation has been created.");
      router.push("/chat");

      const participants = response.participants;
      const userId = response.userId;

      // identify friend participant from the array.
      const friendParticipant = participants.find(
        (participant: any) => participant.participantId !== userId
      );

      const conversationDetails = {
        friendId: friendParticipant?.participantId,
        friendFirstName: friendParticipant?.firstName,
        friendLastName: friendParticipant?.lastName,
        profileImageUrl: friendParticipant?.profileImageUrl,
      };

      setConversationInfo({
        ...conversationInfo,
        conversationId: response.chatId,
        conversationDetails: conversationDetails,
      });
    }
  }, [response, error, router]);

  // actions for when creating a new conversation fails.
  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  return (
    <Button
      variant={"outline"}
      className="px-2 py-4 flex flex-row gap-4 items-center justify-normal border-none shadow-none hover:bg-gray-100 h-fit w-full"
      onClick={() => handleFriendCardClick(friendId)}
      disabled={loading || Boolean(response)}
    >
      <UserAvatar
        firstName={friendFirstName}
        lastName={friendLastName}
        profileImageUrl={friendProfileImageUrl}
        classes="w-16 h-16 border border-primary"
      />
      <div className="flex flex-col gap-0 items-start flex-grow">
        <p className="text-xl font-regular">{friendName}</p>
        <p className="text-base font-regular">{friendEmail}</p>
      </div>
    </Button>
  );
}

export default FriendListCard;
