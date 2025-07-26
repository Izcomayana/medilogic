import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

export const InputFieldWith = ({
  id,
  name,
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
  error,
  disabled,
  autoComplete = "",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm font-medium text-gray-700">
      {placeholder}
    </Label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`pl-10 h-12 transition-all duration-200 focus:outline-none focus:ring-1 ${
          error
            ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
        }`}
      />
    </div>
    {error && (
      <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    )}
  </div>
);
