import { LoadingSkeleton } from "./LoadingSkeleton";

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <LoadingSkeleton width="150px" height="24px" />
        <LoadingSkeleton width="100px" height="24px" />
      </div>

      {/* Table Rows Skeleton */}
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 p-4 bg-white rounded-lg">
            <LoadingSkeleton width="25%" height="20px" />
            <LoadingSkeleton width="20%" height="20px" />
            <LoadingSkeleton width="15%" height="20px" />
            <LoadingSkeleton width="20%" height="20px" />
            <LoadingSkeleton width="10%" height="20px" />
          </div>
        ))}
      </div>
    </div>
  );
}
