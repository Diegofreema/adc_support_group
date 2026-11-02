import { HandCoins, Megaphone } from 'lucide-react'
import type { ReactNode } from 'react'

import { IconTile, StatusChip } from '@/components/shared'

/** Two sample record rows shown on the dark login panel (desktop). */
export function LoginVisual() {
  return (
    <div className="grid max-w-[380px] gap-2.5">
      <VisualRow icon={<IconTile icon={Megaphone} />} title="Rally · Kano" meta="2,400 people" chip={<StatusChip status="approved" />} />
      <VisualRow icon={<IconTile icon={HandCoins} tone="red" />} title="₦250,000" meta="Ibadan chapter" chip={<StatusChip status="paid" />} />
    </div>
  )
}

interface VisualRowProps {
  icon: ReactNode
  title: string
  meta: string
  chip: ReactNode
}

function VisualRow({ icon, title, meta, chip }: VisualRowProps) {
  return (
    <div className="pulse flex items-center gap-3 rounded-md border border-line bg-surface px-3.5 py-3">
      {icon}
      <span className="grow">
        <b className="block font-semibold">{title}</b>
        <span className="faint small">{meta}</span>
      </span>
      {chip}
    </div>
  )
}
