import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AlertTriangle, Home, FileText, Map, LayoutDashboard, Menu, X, Activity } from "lucide-react";
import { useState } from "react";
import { useDemoMode } from "@/hooks/useDemoMode";
import StatusBanner from "./StatusBanner";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Report", path: "/report", icon: FileText },
  { label: "Map", path: "/map", icon: Map },
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDemo, toggleDemo } = useDemoMode();

  return (
    <div className="sticky top-0 z-50">
      <StatusBanner message="🚨 Flood alert: High activity reported in North Zone" />
      <nav className="border-b border-border bg-surface-overlay/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-critical">
              <AlertTriangle className="h-4 w-4 text-critical-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Crisis<span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3 border-l border-border pl-4">
              <div className="flex items-center gap-1.5 rounded-full bg-secondary/50 px-2.5 py-1 text-xs font-medium text-foreground border border-border">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                System Online
              </div>
              <button
                onClick={toggleDemo}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors border",
                  isDemo
                    ? "bg-primary/20 text-primary border-primary/30 glow-primary"
                    : "bg-secondary text-secondary-foreground border-border hover:bg-accent"
                )}
              >
                <Activity className="h-3.5 w-3.5" />
                Demo Mode {isDemo ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden rounded-md p-2 text-muted-foreground hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-border bg-surface-overlay px-4 py-3 md:hidden animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
              <div className="flex items-center justify-center gap-1.5 rounded-full bg-secondary/50 px-3 py-2 text-xs font-medium text-foreground border border-border">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                System Online
              </div>
              <button
                onClick={toggleDemo}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors border",
                  isDemo
                    ? "bg-primary/20 text-primary border-primary/30 glow-primary"
                    : "bg-secondary text-secondary-foreground border-border hover:bg-accent"
                )}
              >
                <Activity className="h-4 w-4" />
                Demo Mode {isDemo ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
