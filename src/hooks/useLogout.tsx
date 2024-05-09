import { logoutUser } from "@/lib/helpers";
import { UserInfo } from "@/types";
import { useEffect, useState } from "react";

export default function useLogout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [logoutResponse, setLogoutResponse] = useState<string | undefined>(
    undefined
  );

  const userInfo = "falana";

  const logoutFn = async () => {
    const res = (await logoutUser({ setLoading, setError }))?.message;
    res && setLogoutResponse(res);
  };

  return { loading, logoutResponse, logoutFn, error };
}
