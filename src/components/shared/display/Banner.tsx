import { CircleCheck, CircleX, Info, TriangleAlert, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export type BannerTone = 'info' | 'warn' | 'success' | 'danger'

const TONE_ICON: Record<BannerTone, LucideIcon> = {
  info: Info,
  warn: TriangleAlert,
  success: CircleCheck,
  danger: CircleX,
}

interface BannerProps {
  tone?: BannerTone
  title?: string
  children?: ReactNode
  className?: string
}

/** One-line notice with a coloured spine. */
export function Banner({ tone = 'info', title, children, className }: BannerProps) {
  const Icon = TONE_ICON[tone]
  return (
    <div className={`banner banner-${tone} ${className ?? ''}`} role={tone === 'danger' ? 'alert' : 'status'}>
      <Icon className="i" aria-hidden />
      <div className="grow">
        {title && <div className="banner-title">{title}</div>}
        {children}
      </div>
    </div>
  )
}
