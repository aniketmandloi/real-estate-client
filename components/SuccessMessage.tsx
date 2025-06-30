interface SuccessMessageProps {
  className?: string;
}

export function SuccessMessage({ className }: SuccessMessageProps) {
  return (
    <div className={`rounded-lg bg-green-50 p-6 text-center ${className}`}>
      <h3 className="text-lg font-semibold text-green-800">
        Thank You for Your Interest!
      </h3>
      <p className="mt-2 text-sm text-green-700">
        We&apos;ve received your viewing request. Our team will contact you
        shortly to confirm the details and arrange the perfect time for your
        visit.
      </p>
    </div>
  );
}
