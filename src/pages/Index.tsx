import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, Map, LayoutDashboard, ArrowRight, Shield, Radio, FileText, Brain, Eye } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "AI Emergency Triage",
    description: "Automatically classify and prioritize incoming reports using advanced natural language processing and severity analysis.",
  },
  {
    icon: Map,
    title: "Live Crisis Map",
    description: "Visualize real-time emergency reports on an interactive map with urgency-coded markers and cluster analysis.",
  },
  {
    icon: LayoutDashboard,
    title: "Command Dashboard",
    description: "Centralized situational overview with AI-generated summaries, resource recommendations, and trend analytics.",
  },
];

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Report Emergency",
    description: "Citizens submit reports describing the situation via text or voice input with location data.",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Detects Urgency",
    description: "Our AI engine analyzes reports in real-time, classifying severity and identifying patterns across incidents.",
  },
  {
    icon: Eye,
    step: "03",
    title: "Responders See Live Map",
    description: "Emergency teams get a live dashboard with prioritized reports, resource suggestions, and coordination tools.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle grid bg */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            {/* Status badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-critical/30 bg-critical/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-critical animate-fade-in">
              <Radio className="h-3 w-3 animate-pulse" />
              Live Monitoring Active
            </div>

            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-in">
              CrisisAI — Real-Time{" "}
              <span className="text-gradient-hero">Disaster Intelligence</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Report emergencies, get guidance, help responders act faster.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Link
                to="/report"
                className="inline-flex items-center gap-2 rounded-lg bg-critical px-6 py-3 text-sm font-semibold text-critical-foreground shadow-lg transition-all hover:brightness-110 glow-critical"
              >
                <Shield className="h-4 w-4" />
                Report Emergency
              </Link>
              <Link
                to="/map"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
              >
                <Map className="h-4 w-4" />
                View Crisis Map
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">How CrisisAI Works</h2>
            <p className="mt-3 text-muted-foreground">Three steps from emergency report to coordinated response.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.step} className="relative text-center animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                {/* Connector line on desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
                )}
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card card-shadow">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">{step.step}</span>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-xs mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-surface-overlay">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Intelligent Emergency Response</h2>
            <p className="mt-3 text-muted-foreground">Powered by AI to save lives and coordinate resources.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-6 card-shadow transition-colors hover:border-primary/30 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
