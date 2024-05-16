import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

function CardLoading() {
  return (
    <Card className="border-none shadow-none px-2 py-4 flex flex-row gap-4">
      <Skeleton className="w-16 h-16 rounded-full" />
      <Skeleton className="flex-grow" />
    </Card>
  );
}

export default CardLoading;
