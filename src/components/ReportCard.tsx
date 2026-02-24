import { cn } from "@/lib/utils";
import { type CrisisReport } from "@/data/demoReports";
import UrgencyBadge from "./UrgencyBadge";
import { MapPin, Clock } from "lucide-react";

interface ReportCardProps {
  report: CrisisReport;
  className?: string;
  compact?: boolean;
}

const ReportCard = ({ report, className, compact = false }: ReportCardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className={cn("text-sm text-card-foreground leading-relaxed", compact && "line-clamp-2")}>
          {report.message}
        </p>
        <UrgencyBadge urgency={report.urgency} className="shrink-0" />
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {report.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {report.timestamp}
        </span>
      </div>
    </div>
  );
};

export default ReportCard;
