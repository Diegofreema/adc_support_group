import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { IconTile } from './IconTile'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  action?: ReactNode
}

export function EmptyState({ icon, title, action }: EmptyStateProps) {
  return (
    <div className="empty">
      <IconTile icon={icon} tone="grey" />
      <p className="bold">{title}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
