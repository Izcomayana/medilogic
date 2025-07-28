import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InputField = ({
  label,
  icon,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  password,
  show,
  setShow,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="relative">
        {icon}

        <Input
          id={name}
          name={name}
          type={password && show ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={name}
          className={`pl-10 transition-all duration-200 focus:outline-none focus:ring-1 ${
            error
              ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-[#15941f] focus:ring-[#15941f]/20"
          }`}
        />

        {password && setShow && (
          <Button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-400 hover:text-gray-600 hover:bg-transparent transition-colors p-2 h-auto"
          >
            {show ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        )}
      </div>
      {error && (
        <div className="flex items-center text-red-600 text-sm space-x-1 mt-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
