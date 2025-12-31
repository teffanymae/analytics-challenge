import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChartLoading() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    </Card>
  );
}
