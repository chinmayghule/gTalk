import { useState } from "react";
import CustomInput from "./CustomInput";
import { Button } from "./ui/button";

function CustomPasswordInput({ ...props }: { [key: string]: any }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CustomInput
      endIcon={
        <Button
          variant={"ghost"}
          type="button"
          className="p-0 cursor-pointer h-min hover:bg-transparent"
          onClick={() => setShowPassword((prevState) => !prevState)}
        >
          {showPassword ? "Hide" : "Show"}
        </Button>
      }
      type={showPassword ? "text" : "password"}
      className="bg-white"
      {...props}
    />
  );
}

export default CustomPasswordInput;
