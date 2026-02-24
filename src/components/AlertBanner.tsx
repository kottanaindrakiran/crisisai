import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface AlertBannerProps {
  message: string;
  variant?: "success" | "warning" | "error";
  className?: string;
  dismissible?: boolean;
}

const variantConfig = {
  success: {
    icon: CheckCircle,
    classes: "bg-stable/10 border-stable/30 text-stable",
  },
  warning: {
    icon: AlertTriangle,
    classes: "bg-urgent/10 border-urgent/30 text-urgent",
  },
  error: {
    icon: AlertTriangle,
    classes: "bg-critical/10 border-critical/30 text-critical",
  },
};

const AlertBanner = ({ message, variant = "success", className, dismissible = true }: AlertBannerProps) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const { icon: Icon, classes } = variantConfig[variant];

  return (
    <div className={cn("flex items-center gap-3 rounded-lg border p-4 animate-fade-in", classes, className)}>
      <Icon className="h-5 w-5 shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      {dismissible && (
        <button onClick={() => setVisible(false)} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default AlertBanner;
