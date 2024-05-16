"use client";

import { Button } from "@/components/ui/button";

function ForgotYourPassword() {
  const handleClick = () => {
    window.alert("This feature isn't ready yet.");
  };

  return (
    <Button
      variant={"link"}
      className="ml-auto p-0 inline-block text-base underline"
      onClick={handleClick}
    >
      Forgot your password?
    </Button>
  );
}

export default ForgotYourPassword;
