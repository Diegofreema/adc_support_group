import { formatNumber } from '@/lib/format'

/** "members +124" */
export function GrowthCaption({ label, growth }: { label: string; growth: number }) {
  return (
    <>
      {label} {growth > 0 && <span className="green bold">+{formatNumber(growth)}</span>}
    </>
  )
}
