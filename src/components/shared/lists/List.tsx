import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** Ruled list container. Children should be ListItem rows. */
export function List({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('list', className)}>{children}</div>
}
