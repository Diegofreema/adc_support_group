import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  action?: ReactNode
  className?: string
}

/** "TO DO ———— See all": mono label with a hairline running right. */
export function SectionTitle({ title, action, className }: SectionTitleProps) {
  return (
    <div className={cn('section-title', className)}>
      <h2>{title}</h2>
      {action}
    </div>
  )
}
