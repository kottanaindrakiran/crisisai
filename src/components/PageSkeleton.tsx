import { cn } from "@/lib/utils";

interface PageSkeletonProps {
  variant?: "cards" | "summary" | "list";
  className?: string;
}

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={cn("rounded-lg bg-muted animate-pulse", className)} />
);

const PageSkeleton = ({ variant = "cards", className }: PageSkeletonProps) => {
  if (variant === "summary") {
    return (
      <div className={cn("rounded-xl border border-border bg-card p-6 card-shadow space-y-3", className)}>
        <SkeletonBlock className="h-4 w-40" />
        <SkeletonBlock className="h-3 w-full" />
        <SkeletonBlock className="h-3 w-5/6" />
        <SkeletonBlock className="h-3 w-4/6" />
        <SkeletonBlock className="h-3 w-full" />
        <SkeletonBlock className="h-3 w-3/4" />
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={cn("space-y-3", className)}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-4 space-y-2">
            <SkeletonBlock className="h-3 w-full" />
            <SkeletonBlock className="h-3 w-3/4" />
            <div className="flex gap-3 pt-1">
              <SkeletonBlock className="h-3 w-20" />
              <SkeletonBlock className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4 sm:grid-cols-3", className)}>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-lg border border-border bg-card p-5 space-y-3">
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="h-8 w-16" />
        </div>
      ))}
    </div>
  );
};

export default PageSkeleton;
