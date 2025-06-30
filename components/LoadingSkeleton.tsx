interface LoadingSkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export function LoadingSkeleton({
  className,
  width = "100%",
  height = "20px",
}: LoadingSkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-md ${className}`}
      style={{ width, height }}
    />
  );
}
