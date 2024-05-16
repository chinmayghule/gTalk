import React, { ReactElement } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

function CustomInput({
  startIcon,
  endIcon,
  ...props
}: {
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  [key: string]: any;
}) {
  return (
    <div className="flex w-full items-center space-x-2 relative">
      {startIcon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {startIcon}
        </div>
      )}
      <Input
        className={cn(
          "text-base border-none bg-secondary",
          startIcon && "pl-12 !ml-0",
          endIcon && "pr-12 !mr-0"
        )}
        {...props}
      />
      {endIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {endIcon}
        </div>
      )}
    </div>
  );
}

export default CustomInput;
