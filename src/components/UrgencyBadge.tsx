import { cn } from "@/lib/utils";
import { type Urgency } from "@/data/demoReports";

interface UrgencyBadgeProps {
  urgency: Urgency;
  className?: string;
}

const config: Record<Urgency, { label: string; classes: string }> = {
  critical: {
    label: "Critical",
    classes: "bg-critical/15 text-critical border-critical/30",
  },
  urgent: {
    label: "Urgent",
    classes: "bg-urgent/15 text-urgent border-urgent/30",
  },
  stable: {
    label: "Stable",
    classes: "bg-stable/15 text-stable border-stable/30",
  },
};

const UrgencyBadge = ({ urgency, className }: UrgencyBadgeProps) => {
  const safeUrgency = (urgency?.toLowerCase() as Urgency) || "stable";
  const { label, classes } = config[safeUrgency] || config.stable;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase",
        classes,
        className
      )}
    >
      <span className={cn(
        "h-1.5 w-1.5 rounded-full",
        urgency === "critical" && "bg-critical animate-pulse",
        urgency === "urgent" && "bg-urgent",
        urgency === "stable" && "bg-stable"
      )} />
      {label}
    </span>
  );
};

export default UrgencyBadge;
