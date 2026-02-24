import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AlertBanner from "@/components/AlertBanner";
import LoadingSpinner from "@/components/LoadingSpinner";
import { mockLocations } from "@/data/demoReports";
import { Send, Mic, MapPin, AlertTriangle, Map, Info, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { submitEmergencyReport } from "@/services/reportService";


const MAX_CHARS = 500;

const ReportPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !location) return;

    setLoading(true);
    setErrorMsg("");
    try {
      await submitEmergencyReport(message, location);
      setSubmitted(true);
      setMessage("");
      setLocation("");
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMsg("Could not save report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-overlay/80 backdrop-blur-sm">
          <div className="rounded-xl border border-border bg-card p-8 card-shadow text-center animate-fade-in">
            <LoadingSpinner size="lg" className="mb-4 justify-center" />
            <p className="text-sm font-medium text-foreground">Analyzing emergency with AI…</p>
            <p className="text-xs text-muted-foreground mt-1">Classifying urgency and notifying responders</p>
          </div>
        </div>
      )}

      <main className="flex-1 flex items-start justify-center px-4 py-12 sm:py-20">
        <div className="w-full max-w-lg animate-fade-in">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-critical/10 glow-critical">
              <AlertTriangle className="h-7 w-7 text-critical" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Report Emergency</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Provide details about the emergency situation. Your report will be forwarded to responders.
            </p>
          </div>

          {submitted && (
            <div className="space-y-3 mb-6">
              <AlertBanner
                message="Your report has been submitted and is now visible to responders."
                variant="success"
              />
              <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 animate-fade-in">
                <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Your report is now visible on the live crisis map.</p>
                  <Link to="/map" className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1">
                    <Map className="h-3 w-3" />
                    View Crisis Map
                  </Link>
                </div>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6">
              <AlertBanner message={errorMsg} variant="error" />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Message */}
            <div className="rounded-xl border border-border bg-card p-5 card-shadow space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-card-foreground">
                  Describe your emergency situation
                </label>
                <textarea
                  className="w-full rounded-lg border border-border bg-input p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  rows={5}
                  maxLength={MAX_CHARS}
                  placeholder="What is happening? Include details about injuries, hazards, and number of people affected..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="mt-1.5 flex items-center justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent"
                  >
                    <Mic className="h-3.5 w-3.5" />
                    Voice Input
                  </button>
                  <span className={`text-xs ${message.length >= MAX_CHARS ? "text-critical" : "text-muted-foreground"}`}>
                    {message.length}/{MAX_CHARS}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-medium text-card-foreground">
                  <MapPin className="mr-1 inline h-3.5 w-3.5" />
                  Location
                </label>
                <select
                  className="w-full rounded-lg border border-border bg-input p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Select location...</option>
                  {mockLocations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-critical px-6 py-3 text-sm font-semibold text-critical-foreground shadow-lg transition-all hover:brightness-110 glow-critical disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {loading ? "Submitting..." : "Submit Emergency Report"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportPage;
