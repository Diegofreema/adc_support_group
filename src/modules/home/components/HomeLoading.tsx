/** Placeholder blocks while the dashboard loads. */
export function HomeLoading() {
  return (
    <div className="grid gap-4" aria-busy="true" aria-label="Loading">
      <div className="h-56 animate-pulse rounded-md bg-surface-muted" />
      <div className="h-20 animate-pulse rounded-md bg-surface-muted" />
      <div className="h-36 animate-pulse rounded-md bg-surface-muted" />
    </div>
  )
}
