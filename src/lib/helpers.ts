import { GetFriendRequestResponse } from "@/types";
import apiClient from "./axiosConfig";
import axios from "axios";
import cookie from "cookiejs";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL!;

export async function logoutUser({
  setLoading,
  setError,
}: {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}) {
  let logoutResponse;

  try {
    setLoading(true);
    const res = await apiClient.get("/logout");

    logoutResponse = await res.data;

    cookie.remove("token");
    cookie.remove("userInfo");
  } catch (error: any) {
    console.log(error.message);
    setError(error.message);
  } finally {
    setLoading(false);
  }

  return logoutResponse as { message: string };
}

export async function getUserInfo({
  setLoading,
  setError,
}: {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}) {
  let data;
  try {
    setLoading(true);
    const res = await apiClient.get("/user");

    data = await res.data;
  } catch (error: any) {
    console.log(error.message);
    setError(
      "We were unable to get your profile information. Please try again later."
    );
  } finally {
    setLoading(false);
  }

  return data;
}

export async function getAllFriends({
  setLoading,
  setError,
}: {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}) {
  let data;

  try {
    setLoading(true);
    const res = await apiClient.get("/friends");

    data = await res.data;
  } catch (error: any) {
    console.log(error.message);
    setError("We were unable to get your friend list. Please try again later.");
  } finally {
    setLoading(false);
  }

  return data;
}

export async function searchFriendByQuery({
  query,
  setLoading,
  setError,
}: {
  query: string;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}) {
  let data;

  try {
    setLoading(true);
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BASE_API_URL!}/friends/search`
    );

    const res = await apiClient.get("/friends/search", {
      params: {
        q: query,
      },
    });

    data = await res.data;
  } catch (error: any) {
    console.error(error);
    setError("We were unable to get the users. Please try again later.");
  } finally {
    setLoading(false);
  }

  return data;
}

export async function getAllFriendRequests({
  setLoading,
  setError,
}: {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}) {
  let data;
  try {
    setLoading(true);
    const res = await apiClient.get("/friendRequests");

    data = (await res.data) as GetFriendRequestResponse;
    return data;
  } catch (error: any) {
    console.log(error.message);
    setError(
      "We were unable to get your friend request list. Please try again later."
    );
  } finally {
    setLoading(false);
  }

  return data;
}

export async function getPotentialFriends({
  query,
  setLoading,
  setError,
}: {
  query: string;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}) {
  let data;

  try {
    setLoading(true);

    const res = await apiClient.get("/search", {
      params: {
        q: query,
      },
    });

    data = await res.data;
  } catch (error: any) {
    if (error.name === "AbortError") return;
    console.error(error);
    setError("We were unable to get the users. Please try again later.");
  } finally {
    setLoading(false);
  }

  return data;
}

export async function sendFriendRequest({
  setLoading,
  setError,
  receiverId,
}: {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  receiverId: string;
}) {
  let data;
  try {
    setLoading(true);
    const res = await apiClient.post("/friendRequests", { receiverId });

    data = await res.data;
  } catch (error: any) {
    console.log(error.message);
    setError(
      "We were unable to send your friend request. Please try again later."
    );
  } finally {
    setLoading(false);
  }

  return data;
}

export async function friendRequestAction({
  setLoading,
  setError,
  friendRequestId,
  action,
}: {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  friendRequestId: string;
  action: string;
}) {
  let data;
  try {
    setLoading(true);
    const res = await apiClient.post(`/friendRequests/${friendRequestId}`, {
      action,
    });

    data = await res.data;
  } catch (error: any) {
    console.log(error.message);

    if (action !== "accept" && action !== "decline") {
      setError("Some problem occured. Please try again later.");
    } else {
      setError(error.message);
    }
  } finally {
    setLoading(false);
  }

  return data;
}

export async function sendUnfriendRequest({
  setLoading,
  setError,
  friendId,
}: {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  friendId: string;
}) {
  let data;
  try {
    setLoading(true);
    const res = await apiClient.delete(`/friends/${friendId}`);

    data = await res.data;
  } catch (error: any) {
    console.log(error.message);
    setError(
      "We were unable to send your request to unfriend. Please try again later."
    );
  } finally {
    setLoading(false);
  }

  return data;
}

export async function getAllConversations({
  setLoading,
  setError,
}: {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}) {
  let data;
  try {
    setLoading(true);
    const res = await apiClient.get(`/chat`);

    data = await res.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    setError(
      "We were unable to get your conversations. Please try again later."
    );
  } finally {
    setLoading(false);
  }

  return data;
}

export async function getSingleConversation({
  conversationId,
  abortSignal,
  setLoading,
  setError,
}: {
  conversationId: string;
  abortSignal: AbortSignal;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}) {
  let data;
  try {
    setLoading(true);
    const res = await apiClient.get(`/chat/${conversationId}`, {
      signal: abortSignal,
    });

    data = await res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.name === "CanceledError") {
      return;
    }

    console.log(error);
    setError("We were unable to get your messages. Please try again later.");
  } finally {
    setLoading(false);
  }

  return data;
}

export async function startNewConversation({
  setLoading,
  setError,
  participants,
}: {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  participants: string[];
}) {
  let data;
  try {
    setLoading(true);
    const res = await apiClient.post("/chat/create", {
      participants,
    });

    data = await res.data;
  } catch (error: any) {
    console.log(error.message);
    setError(
      "We were unable to create a new conversation for you. Please try again later."
    );
  } finally {
    setLoading(false);
  }

  return data;
}
