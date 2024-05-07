import { getUserInfo } from "@/lib/helpers";
import { UserInfo } from "@/types";
import { useEffect, useState } from "react";

export default function useGetUserInfo() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const data = (await getUserInfo({ setLoading, setError }))?.user;
      setUserInfo(data);
    }

    fetchData();
  }, []);

  return { loading, userInfo, error };
}
