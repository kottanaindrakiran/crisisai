import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReportCard from "@/components/ReportCard";
import UrgencyBadge from "@/components/UrgencyBadge";
import MarkerDetailsModal from "@/components/MarkerDetailsModal";
import PageSkeleton from "@/components/PageSkeleton";
import { mockReports, demoScenarioReports, markerSuggestedActions, type CrisisReport, type Urgency } from "@/data/demoReports";
import { useDemoMode } from "@/hooks/useDemoMode";
import { useReports, type DBReport } from "@/hooks/useReports";
import { MapPin, Play, Zap } from "lucide-react";

function getMarkerPosition(lat: number, lng: number) {
  const latMin = 40.60;
  const latMax = 40.80;
  const lngMin = -74.05;
  const lngMax = -73.75;
  const topPct = 100 - ((lat - latMin) / (latMax - latMin) * 100);
  const leftPct = ((lng - lngMin) / (lngMax - lngMin) * 100);
  return {
    top: `${Math.max(0, Math.min(100, topPct))}%`,
    left: `${Math.max(0, Math.min(100, leftPct))}%`
  };
}

function mapReportToCrisisReport(dbReport: DBReport): CrisisReport {
  return {
    id: dbReport.id,
    message: dbReport.message || dbReport.summary,
    location: `${dbReport.lat.toFixed(4)}, ${dbReport.lng.toFixed(4)}`, // coordinate display
    urgency: dbReport.urgency as Urgency,
    timestamp: new Date(dbReport.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

interface MapMarker {
  top: string;
  left: string;
  urgency: Urgency;
  reportId: string;
}

const defaultMarkers: MapMarker[] = [
  { top: "20%", left: "30%", urgency: "critical", reportId: "1" },
  { top: "35%", left: "65%", urgency: "critical", reportId: "2" },
  { top: "55%", left: "45%", urgency: "urgent", reportId: "3" },
  { top: "70%", left: "25%", urgency: "urgent", reportId: "4" },
  { top: "40%", left: "80%", urgency: "stable", reportId: "5" },
  { top: "60%", left: "60%", urgency: "stable", reportId: "6" },
];

const demoMarkers: MapMarker[] = [
  { top: "15%", left: "25%", urgency: "critical", reportId: "demo-1" },
  { top: "25%", left: "75%", urgency: "critical", reportId: "demo-2" },
  { top: "45%", left: "35%", urgency: "critical", reportId: "demo-3" },
  { top: "60%", left: "55%", urgency: "urgent", reportId: "demo-4" },
  { top: "50%", left: "70%", urgency: "urgent", reportId: "demo-5" },
  { top: "75%", left: "40%", urgency: "stable", reportId: "demo-6" },
  { top: "80%", left: "65%", urgency: "stable", reportId: "demo-7" },
];

const CrisisMapPage = () => {
  const { isDemo, toggleDemo } = useDemoMode();
  const [selectedReport, setSelectedReport] = useState<CrisisReport | null>(null);
  const { reports: liveDbReports, loading } = useReports();

  const liveReportsConverted = liveDbReports.map(mapReportToCrisisReport);
  const liveMarkers = liveDbReports.map(r => {
    const pos = getMarkerPosition(r.lat, r.lng);
    return { ...pos, urgency: r.urgency as Urgency, reportId: r.id };
  });

  const reports = isDemo ? [...demoScenarioReports, ...mockReports] : liveReportsConverted;
  const markers = isDemo ? [...demoMarkers, ...defaultMarkers] : liveMarkers;
  const allReportsMap = [...mockReports, ...demoScenarioReports, ...liveReportsConverted].reduce((acc, r) => {
    acc[r.id] = r;
    return acc;
  }, {} as Record<string, CrisisReport>);

  const dbReportsMap = liveDbReports.reduce((acc, r) => {
    acc[r.id] = r;
    return acc;
  }, {} as Record<string, DBReport>);

  const handleMarkerClick = (reportId: string) => {
    const report = allReportsMap[reportId];
    if (report) setSelectedReport(report);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {selectedReport && (
        <MarkerDetailsModal
          report={selectedReport}
          suggestedAction={dbReportsMap[selectedReport.id]?.advice || markerSuggestedActions[selectedReport.id] || "Assess situation and report to command."}
          onClose={() => setSelectedReport(null)}
        />
      )}

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h1 className="text-2xl font-bold text-foreground">Live Crisis Map</h1>
            <button
              onClick={toggleDemo}
              className="inline-flex items-center gap-2 rounded-lg border border-urgent/30 bg-urgent/10 px-4 py-2 text-sm font-semibold text-urgent transition-all hover:bg-urgent/20"
            >
              {isDemo ? (
                <Zap className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {isDemo ? "Disable Demo Scenario" : "Load Demo Crisis Scenario"}
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Map placeholder */}
            <div className="relative rounded-xl border border-border bg-card overflow-hidden card-shadow min-h-[500px]">
              {/* Fake map grid */}
              <div className="absolute inset-0 opacity-[0.06]" style={{
                backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }} />

              {/* Clickable markers */}
              {markers.length === 0 && (
                <div className="absolute flex inset-0 items-center justify-center bg-card/60 backdrop-blur-sm z-10">
                  <p className="text-sm font-medium text-foreground p-4 bg-surface-overlay/90 rounded-xl border border-border shadow-lg">
                    No incidents reported yet. Reports will appear here in real time.
                  </p>
                </div>
              )}
              {markers.map((marker, i) => (
                <button
                  key={`${marker.reportId}-${i}`}
                  className="absolute group"
                  style={{ top: marker.top, left: marker.left }}
                  onClick={() => handleMarkerClick(marker.reportId)}
                  title="Click for details"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:scale-125 ${marker.urgency === "critical" ? "bg-critical/20 animate-pulse" :
                    marker.urgency === "urgent" ? "bg-urgent/20" : "bg-stable/20"
                    }`}>
                    <MapPin className={`h-4 w-4 ${marker.urgency === "critical" ? "text-critical" :
                      marker.urgency === "urgent" ? "text-urgent" : "text-stable"
                      }`} />
                  </div>
                </button>
              ))}

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-sm text-muted-foreground bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
                  Click markers for incident details
                </p>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 rounded-lg border border-border bg-card/90 backdrop-blur-sm p-3 space-y-2">
                <p className="text-xs font-semibold text-card-foreground uppercase tracking-wider">Legend</p>
                <div className="flex flex-col gap-1.5">
                  <UrgencyBadge urgency="critical" />
                  <UrgencyBadge urgency="urgent" />
                  <UrgencyBadge urgency="stable" />
                </div>
              </div>
            </div>

            {/* Sidebar reports list */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Recent Reports ({reports.length})
              </h2>
              {loading && !isDemo ? (
                <PageSkeleton variant="list" />
              ) : reports.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center text-center rounded-xl border border-border bg-card p-6 border-dashed">
                  <p className="text-sm text-muted-foreground">No incidents reported yet. Reports will appear here in real time.</p>
                </div>
              ) : (
                reports.map((report) => (
                  <ReportCard key={report.id} report={report} compact />
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CrisisMapPage;
