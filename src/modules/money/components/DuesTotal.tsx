import { formatNaira } from '@/lib/format'

/** "₦1,500 · Nov 2026 to Jan 2027", shown before saving. */
export function DuesTotal({ total, covers }: { total: number; covers: string }) {
  return (
    <div className="card row-between mt-5 !bg-[var(--green-soft)] !border-[var(--green-line)]" aria-live="polite">
      <span><span className="small muted block">Total to record</span><span className="small bold">{covers}</span></span>
      <span className="h2 num">{formatNaira(total)}</span>
    </div>
  )
}
