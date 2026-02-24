import { AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface StatusBannerProps {
  message: string;
  className?: string;
}

const StatusBanner = ({ message, className }: StatusBannerProps) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className={cn(
      "w-full bg-critical/10 border-b border-critical/20 px-4 py-2 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-critical",
      className
    )}>
      <AlertTriangle className="h-3.5 w-3.5 shrink-0 animate-pulse" />
      <span className="truncate">{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="ml-2 shrink-0 rounded p-0.5 opacity-60 hover:opacity-100 transition-opacity"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export default StatusBanner;
