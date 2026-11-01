import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export function Tag({ icon: Icon, children }: { icon?: LucideIcon; children: ReactNode }) {
  return (
    <span className="tag">
      {Icon && <Icon className="i" aria-hidden />}
      {children}
    </span>
  )
}
