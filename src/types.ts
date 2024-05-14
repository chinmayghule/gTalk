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

export type Message = {
  messageId: string;
  content: string;
  timestamp: string;
  sender_id: string;
  chat_id: string;
  deleted_by: string[];
};

export type SocketClientMessageInfo = {
  content: string;
  chat_id: string;
  timestamp: string;
  friendId: string | undefined;
};

// types for socket.io

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  messageFromServer: (data: any) => void;
}

export interface ClientToServerEvents {
  messageToServer: (messageInfo: SocketClientMessageInfo) => void;
  joinRoom: (conversationId: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

// types for socket.io: end
