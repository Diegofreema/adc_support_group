import { formatNaira } from '@/lib/format'

/** "₦1,500 · Nov 2026 to Jan 2027", shown before saving. */
export function DuesTotal({ total, covers }: { total: number; covers: string }) {
  return (
    <div className="row-between mt-5" aria-live="polite">
      <span className="muted">Total · {covers}</span>
      <span className="h2 num">{formatNaira(total)}</span>
    </div>
  )
}
