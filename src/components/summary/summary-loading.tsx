import { Skeleton } from "@/components/ui/skeleton";

export function SummaryLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg border p-6 shadow-sm"
        >
          <Skeleton className="h-4 w-1/3 mb-4" />
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      ))}
    </div>
  );
}
