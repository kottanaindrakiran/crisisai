import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "critical" | "urgent" | "stable";
  className?: string;
  animate?: boolean;
}

const variantStyles = {
  default: "border-border",
  critical: "border-critical/30 glow-critical",
  urgent: "border-urgent/30",
  stable: "border-stable/30",
};

const iconStyles = {
  default: "text-primary",
  critical: "text-critical",
  urgent: "text-urgent",
  stable: "text-stable",
};

const useAnimatedNumber = (target: number, duration = 1200) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCurrent(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return current;
};

const StatsCard = ({ title, value, icon: Icon, variant = "default", className, animate = false }: StatsCardProps) => {
  const numValue = typeof value === "number" ? value : parseInt(value) || 0;
  const animatedValue = useAnimatedNumber(animate ? numValue : numValue);
  const displayValue = animate ? animatedValue : value;

  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-5 card-shadow",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-bold text-card-foreground">{displayValue}</p>
        </div>
        <div className={cn("rounded-lg bg-secondary p-3", iconStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
