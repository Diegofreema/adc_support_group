import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

export interface QuickAction {
  label: string
  icon: LucideIcon
  to?: string
  onClick?: () => void
}

/** Row of square "key" shortcuts with one word each. */
export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <nav className="quick" aria-label="Quick actions">
      {actions.map((action) => (
        <QuickActionItem key={action.label} action={action} />
      ))}
    </nav>
  )
}

function QuickActionItem({ action }: { action: QuickAction }) {
  const content = (
    <>
      <span className="q-icon"><action.icon className="i" aria-hidden /></span>
      {action.label}
    </>
  )
  if (action.to) return <Link to={action.to}>{content}</Link>
  return <button type="button" onClick={action.onClick}>{content}</button>
}
