import { formatNaira } from '@/lib/format'

/** The one big number: what the group has now. */
export function BalanceCard({ balance }: { balance: number }) {
  return (
    <section className="hero-card">
      <span className="eyebrow">Group money now</span>
      <div className="hero-num mt-5">{formatNaira(balance)}</div>
      <div className="small hero-muted mt-1">Money in minus money out</div>
    </section>
  )
}
