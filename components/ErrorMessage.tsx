interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <div
      className={`p-3 rounded-md bg-red-50 border border-red-200 ${className}`}
    >
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
}
