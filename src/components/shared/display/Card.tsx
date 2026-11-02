import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** No inner padding — for lists and tables that run edge to edge. */
  flush?: boolean
}

export function Card({ flush, className, ...rest }: CardProps) {
  return <div className={cn('card', flush && 'card-flush', className)} {...rest} />
}

interface CardHeadProps {
  title: string
  action?: ReactNode
}

/** Mono label header inside a card. */
export function CardHead({ title, action }: CardHeadProps) {
  return (
    <div className="card-head">
      <h3>{title}</h3>
      {action}
    </div>
  )
}
