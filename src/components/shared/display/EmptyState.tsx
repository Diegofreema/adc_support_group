import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { IconTile } from './IconTile'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  /** One plain sentence on what will appear here, or what to do next. */
  description?: ReactNode
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty">
      <IconTile icon={icon} tone="grey" />
      <p className="bold">{title}</p>
      {description && <p className="empty-desc">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
