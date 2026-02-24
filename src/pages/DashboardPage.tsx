import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsCard from "@/components/StatsCard";
import ReportCard from "@/components/ReportCard";
import TimelineItem from "@/components/TimelineItem";
import PageSkeleton from "@/components/PageSkeleton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { mockStats, mockReports, mockAISummary, mockRecommendations, mockTimelineEvents } from "@/data/demoReports";
import { useDemoMode } from "@/hooks/useDemoMode";
import { useReports } from "@/hooks/useReports";
import { generateLiveSummary } from "@/services/summaryService";
import { useEffect } from "react";
import { FileText, AlertTriangle, MapPin, Brain, Lightbulb, ChevronRight, RefreshCw, Clock, Sparkles, Activity } from "lucide-react";

const typeIcons = {
  report: FileText,
  zone: MapPin,
  resource: Lightbulb,
};

const DashboardPage = () => {
  const { isDemo } = useDemoMode();
  const { reports: liveDbReports, loading: dbLoading } = useReports();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [liveSummary, setLiveSummary] = useState(() => {
    return localStorage.getItem("crisis_ai_summary") || "Waiting for incoming crisis data…";
  });
  const [lastSummaryId, setLastSummaryId] = useState("");

  const liveStats = {
    totalReports: liveDbReports.length,
    criticalCases: liveDbReports.filter(r => r.urgency === 'critical').length,
    activeZones: new Set(liveDbReports.map(r => `${r.lat},${r.lng}`)).size,
  };

  const liveReportsConverted = liveDbReports.map(r => ({
    id: r.id,
    message: r.message || r.summary,
    location: `${r.lat.toFixed(4)}, ${r.lng.toFixed(4)}`,
    urgency: r.urgency as any,
    timestamp: new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }));

  const stats = isDemo ? mockStats : liveStats;
  const reports = isDemo ? mockReports : liveReportsConverted;
  const aiSummary = isDemo ? mockAISummary : liveSummary;
  const recommendations = isDemo ? mockRecommendations : []; // Dynamic recommendations optional or from AI text
  const timeline = isDemo ? mockTimelineEvents : []; // Mocking timeline for demo normally, empty for real

  useEffect(() => {
    if (isDemo || liveDbReports.length === 0) {
      if (!isDemo && liveDbReports.length === 0) {
        setLiveSummary("Waiting for incoming crisis data…");
      }
      return;
    }

    const latestId = liveDbReports[0].id;
    if (latestId !== lastSummaryId) {
      setLastSummaryId(latestId);

      // Keep showing cached summary or fallback while loading new one
      const currentCached = localStorage.getItem("crisis_ai_summary");
      setLiveSummary(currentCached ? (currentCached + "\n\n(Generating live updates...)") : "Generating live AI summary updates...");

      generateLiveSummary(liveDbReports.slice(0, 10)).then(summary => {
        if (summary === "Multiple emergency reports detected. Monitor high-risk zones.") {
          // It failed, use cache if available
          const cached = localStorage.getItem("crisis_ai_summary");
          if (cached) {
            setLiveSummary(cached);
            return;
          }
        }
        setLiveSummary(summary);
        localStorage.setItem("crisis_ai_summary", summary);
      }).catch(err => {
        console.error("Dashboard summary error:", err);
        const cached = localStorage.getItem("crisis_ai_summary");
        if (cached) {
          setLiveSummary(cached);
        } else {
          setLiveSummary("Multiple emergency reports detected. Monitor high-risk zones.");
        }
      });
    }
  }, [liveDbReports, isDemo, lastSummaryId]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefreshKey((k) => k + 1);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">CrisisAI Command Center</div>
              <h1 className="text-2xl font-bold text-foreground">Command Dashboard</h1>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Last updated 2 minutes ago
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Refreshing…" : "Refresh Data"}
            </button>
          </div>

          {/* Stats */}
          {refreshing || (dbLoading && !isDemo) ? (
            <PageSkeleton variant="cards" className="mb-8" />
          ) : (
            <div className="grid gap-4 sm:grid-cols-3 mb-8" key={refreshKey}>
              <StatsCard title="Total Reports" value={stats.totalReports} icon={FileText} animate />
              <StatsCard title="Critical Cases" value={stats.criticalCases} icon={AlertTriangle} variant="critical" animate />
              <StatsCard title="Active Zones" value={stats.activeZones} icon={MapPin} variant="urgent" animate />
            </div>
          )}

          {/* Main 2-col layout */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* AI Summary — enhanced */}
            {refreshing || (dbLoading && !isDemo) ? (
              <PageSkeleton variant="summary" />
            ) : (
              <div className="rounded-xl border border-primary/20 bg-card p-6 card-shadow glow-primary relative overflow-hidden">
                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />

                <div className="relative">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Brain className="h-4 w-4 text-primary" />
                    </div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      AI Crisis Summary
                    </h2>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    <Sparkles className="h-3 w-3 text-primary/60" />
                    <span className="text-xs text-primary/60 font-medium">AI Generated Insight</span>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    {aiSummary.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-card-foreground mb-3 last:mb-0">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Recent Reports */}
            <div className="rounded-xl border border-border bg-card p-6 card-shadow">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Recent Reports
              </h2>
              {refreshing || (dbLoading && !isDemo) ? (
                <PageSkeleton variant="list" />
              ) : reports.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center text-center">
                  <p className="text-sm text-muted-foreground">Waiting for incoming crisis data…</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {reports.slice(0, 5).map((report) => (
                    <ReportCard key={report.id} report={report} compact />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Activity Timeline + Resource Suggestions side by side */}
          <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] mb-8">
            {/* Activity Timeline */}
            <div className="rounded-xl border border-border bg-card p-6 card-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-lg bg-accent p-2">
                  <Activity className="h-4 w-4 text-foreground" />
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Activity Timeline
                </h2>
              </div>
              <div className="max-h-[350px] overflow-y-auto pr-1">
                {timeline.length === 0 ? (
                  <div className="flex h-[150px] flex-col items-center justify-center text-center">
                    <p className="text-sm text-muted-foreground">Waiting for incoming crisis data…</p>
                  </div>
                ) : (
                  timeline.map((event, i) => (
                    <TimelineItem
                      key={i}
                      icon={typeIcons[event.type]}
                      title={event.title}
                      description={event.description}
                      time={event.time}
                      variant={event.variant}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Resource Suggestions */}
            <div className="rounded-xl border border-border bg-card p-6 card-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-lg bg-urgent/10 p-2">
                  <Lightbulb className="h-4 w-4 text-urgent" />
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  AI Resource Suggestions
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {recommendations.length === 0 ? (
                  <div className="col-span-2 flex h-[100px] flex-col items-center justify-center text-center">
                    <p className="text-sm text-muted-foreground">Waiting for incoming crisis data…</p>
                  </div>
                ) : (
                  recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 rounded-lg border border-border bg-secondary p-3 text-sm text-secondary-foreground"
                    >
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-urgent" />
                      <span>{rec}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
