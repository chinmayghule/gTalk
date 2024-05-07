import { GetFriendRequestResponse } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL!;

export async function logoutUser() {
  try {
    const res = await fetch(`${baseUrl}/logout`, {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      throw Error();
    }
  } catch (error: any) {
    console.log(error.message);
  }
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
    const res = await fetch(`${baseUrl}/user`, {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      throw Error();
    }

    data = await res.json();
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
    const res = await fetch(`${baseUrl}/friends`, {
      cache: "no-store",
      // cache: "default",
      credentials: "include",
    });

    if (!res.ok) {
      throw Error();
    }

    data = await res.json();
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
    const searchParams = new URLSearchParams();
    searchParams.append("q", query);
    url.search = searchParams.toString();

    const res = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
      credentials: "include",
    });

    data = await res.json();
  } catch (error: any) {
    if (error.name === "AbortError") return;
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
    const res = await fetch(`${baseUrl}/friendRequests`, {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      throw Error();
    }

    data = (await res.json()) as GetFriendRequestResponse;
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
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL!}/search`);
    const searchParams = new URLSearchParams();
    searchParams.append("q", query);
    url.search = searchParams.toString();

    const res = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
      credentials: "include",
    });

    data = await res.json();
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
    const res = await fetch(`${baseUrl}/friendRequests`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiverId }),
    });

    if (!res.ok) {
      throw Error();
    }

    data = await res.json();
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
    const res = await fetch(`${baseUrl}/friendRequests/${friendRequestId}`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    });

    if (!res.ok) {
      throw Error();
    }

    data = await res.json();
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
    const res = await fetch(`${baseUrl}/friends/${friendId}`, {
      method: "DELETE",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw Error();
    }

    data = await res.json();
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
    const res = await fetch(`${baseUrl}/chat`, {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      throw Error();
    }

    data = await res.json();
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
    const res = await fetch(`${baseUrl}/chat/create`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participants }),
    });

    if (!res.ok) {
      throw Error();
    }

    data = await res.json();
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
