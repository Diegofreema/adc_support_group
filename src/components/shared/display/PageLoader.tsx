import { LoaderCircle } from 'lucide-react'

/** Placeholder while a page's data loads. */
export function PageLoader({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="empty" role="status" aria-live="polite">
      <LoaderCircle className="i i-lg mx-auto animate-spin text-muted-foreground" aria-hidden />
      <p className="faint small mt-2">{label}</p>
    </div>
  )
}
