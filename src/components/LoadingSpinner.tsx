import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  text?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const LoadingSpinner = ({ text, className, size = "md" }: LoadingSpinnerProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizes[size])} />
      {text && <span className="text-sm text-muted-foreground font-medium">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
