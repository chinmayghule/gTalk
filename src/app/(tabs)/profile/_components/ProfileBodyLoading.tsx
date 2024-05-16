import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function ProfileBodyLoading() {
  return (
    <div className="flex flex-col gap-8 items-center mt-4 lg:mt-0">
      <Skeleton className="w-36 h-36 rounded-full" />

      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <Skeleton className="h-6 w-[20ch]" />
          <Skeleton className="h-6 w-[24ch]" />
        </div>
        <Skeleton className="h-5 w-[24ch]" />
      </div>
      <Button
        variant={"destructive"}
        className="font-semibold w-full py-6 text-base"
        disabled={true}
      >
        Logout
      </Button>
    </div>
  );
}

export default ProfileBodyLoading;
