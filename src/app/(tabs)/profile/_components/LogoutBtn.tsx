"use client";

import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LogoutBtn() {
  const { loading, logoutResponse, logoutFn, error } = useLogout();
  const router = useRouter();

  // effects.
  useEffect(() => {
    if (logoutResponse) {
      alert(logoutResponse);
      router.push("/login");
    }
    if (error) alert(error);
  }, [error, logoutResponse, router]);

  return (
    <Button
      variant={"destructive"}
      className="font-semibold w-full py-6 text-base"
      disabled={loading || Boolean(logoutResponse)}
      onClick={() => logoutFn()}
    >
      Logout
    </Button>
  );
}

export default LogoutBtn;
