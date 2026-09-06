interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({
  message = "Something went wrong.",
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center py-10">
      <p className="text-red-500">{message}</p>
    </div>
  );
}