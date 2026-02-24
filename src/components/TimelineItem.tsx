import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface TimelineItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  time: string;
  variant?: "critical" | "urgent" | "stable" | "default";
  className?: string;
}

const dotColors = {
  default: "bg-primary",
  critical: "bg-critical",
  urgent: "bg-urgent",
  stable: "bg-stable",
};

const iconColors = {
  default: "text-primary",
  critical: "text-critical",
  urgent: "text-urgent",
  stable: "text-stable",
};

const TimelineItem = ({ icon: Icon, title, description, time, variant = "default", className }: TimelineItemProps) => {
  return (
    <div className={cn("relative flex gap-3 pb-6 last:pb-0", className)}>
      {/* Vertical line */}
      <div className="flex flex-col items-center">
        <div className={cn("h-2.5 w-2.5 rounded-full shrink-0 mt-1.5", dotColors[variant])} />
        <div className="w-px flex-1 bg-border" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <Icon className={cn("h-3.5 w-3.5 shrink-0", iconColors[variant])} />
          <p className="text-sm font-medium text-card-foreground truncate">{title}</p>
        </div>
        <p className="text-xs text-muted-foreground mb-0.5">{description}</p>
        <p className="text-xs text-muted-foreground/60">{time}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
