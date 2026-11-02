import { FileSpreadsheet, Link2, UserPlus, type LucideIcon } from 'lucide-react'

import type { JoinedVia } from '@/types/domain'
import { joinedViaLabel } from '../utils/export-members'

const STYLE: Record<JoinedVia, { className: string; icon: LucideIcon }> = {
  link: { className: 'chip-info', icon: Link2 },
  excel: { className: 'chip-neutral', icon: FileSpreadsheet },
  manual: { className: 'chip-neutral', icon: UserPlus },
}

export function JoinedViaChip({ joinedVia }: { joinedVia: JoinedVia }) {
  const style = STYLE[joinedVia]
  return (
    <span className={`chip ${style.className}`}>
      <style.icon className="i" aria-hidden />
      {joinedViaLabel(joinedVia)}
    </span>
  )
}
