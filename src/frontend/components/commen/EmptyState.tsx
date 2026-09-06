interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "No products found.",
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-10">
      <p className="text-gray-500">{message}</p>
    </div>
  );
}