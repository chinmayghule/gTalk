export type NavItem = {
  icon: React.ReactNode;
  route: string;
  tooltipContent: React.ReactNode;
  isActive: boolean;
};

export type UserInfo = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string | undefined;
};

export type Friend = {
  friendId: string;
  profileImageUrl: string | undefined;
  firstName: string;
  lastName: string;
  email: string;
};

export type FriendContent = {
  friends: Friend[] | undefined;
  friendRequests: FriendRequest[] | undefined;
};

export type FriendRequest = {
  friendRequestId: string;
  potentialFriendId: string;
  friendFirstName: string;
  friendLastName: string;
  profileImageUrl: string | undefined;
};

export type PotentialFriend = {
  _id: string;
  profileImageUrl: string | undefined;
  firstName: string;
  lastName: string;
  email: string;
};

export type Conversation = {
  conversationId: string;
  friendId: string;
  lastMessage: string;
  lastMessageTime: string;
  friendProfileImageUrl: string | undefined;
  friendFirstName: string;
  friendLastName: string;
};

export type GetFriendRequestResponse = {
  userId: string;
  responseFriendRequests: FriendRequest[] | undefined;
};

export type FriendRequestActionState = {
  loading: boolean;
  error: string | undefined;
  response: "accepted" | "declined" | "canceled" | undefined;
};
