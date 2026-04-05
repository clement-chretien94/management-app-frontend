import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PasswordInput({
  id,
  name,
  required,
  className,
}: React.ComponentProps<typeof Input>) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        required={required}
        className={cn("pr-12", className)}
      />
      {showPassword ? (
        <Eye
          width={20}
          height={20}
          onClick={toggleShowPassword}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
        />
      ) : (
        <EyeClosed
          width={20}
          height={20}
          onClick={toggleShowPassword}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
        />
      )}
    </div>
  );
}
