export function SkeletonCard() {
  return (
    <div className="rounded-lg border bg-card p-4 animate-pulse">
      <div className="h-32 rounded bg-muted mb-4" />
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-full bg-muted" />
        <div className="h-4 w-24 rounded bg-muted" />
      </div>
      <div className="flex justify-between">
        <div className="h-5 w-12 rounded-full bg-muted" />
        <div className="h-4 w-16 rounded bg-muted" />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      <div className="h-4 w-32 rounded bg-muted" />
      <div className="h-4 w-24 rounded bg-muted flex-1" />
      <div className="h-4 w-20 rounded bg-muted" />
      <div className="h-8 w-16 rounded bg-muted" />
    </div>
  );
}
