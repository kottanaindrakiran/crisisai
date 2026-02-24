import { useState } from "react";
import { X, MapPin, Clock, Zap } from "lucide-react";
import UrgencyBadge from "./UrgencyBadge";
import { type CrisisReport } from "@/data/demoReports";

interface MarkerDetailsModalProps {
  report: CrisisReport;
  suggestedAction: string;
  onClose: () => void;
}

const MarkerDetailsModal = ({ report, suggestedAction, onClose }: MarkerDetailsModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-surface-overlay/70 backdrop-blur-sm transition-opacity duration-200 ${isClosing ? "opacity-0" : "opacity-100"}`} />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md rounded-xl border border-border bg-card p-6 card-shadow transition-all duration-200 ${isClosing ? "opacity-0 scale-95" : "animate-fade-in opacity-100 scale-100"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Incident Report</h3>
          <UrgencyBadge urgency={report.urgency} />
        </div>

        <p className="text-sm text-card-foreground leading-relaxed mb-4">{report.message}</p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {report.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {report.timestamp}
          </span>
        </div>

        <div className="rounded-lg border border-urgent/20 bg-urgent/5 p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Zap className="h-3.5 w-3.5 text-urgent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-urgent">Suggested Action</span>
          </div>
          <p className="text-sm text-card-foreground">{suggestedAction}</p>
        </div>
      </div>
    </div>
  );
};

export default MarkerDetailsModal;
