import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UseFormRegister, FieldError } from "react-hook-form";
import { LeadFormData } from "@/lib/validations";

interface FormFieldProps {
  id: keyof LeadFormData;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  register: UseFormRegister<LeadFormData>;
  className?: string;
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  required = true,
  error,
  register,
  className,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className={cn(error && "border-red-500", className)}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}
