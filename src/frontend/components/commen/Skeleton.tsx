interface SkeletonProps {
  count?: number;
}

export default function Skeleton({
  count = 8,
}: SkeletonProps) {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-md bg-gray-200 h-20 mb-4"
        />
      ))}
    </div>
  );
}