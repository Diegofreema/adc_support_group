import type { ButtonHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  /** Required: icon-only buttons must still say what they do. */
  label: string
}

export function IconButton({ icon: Icon, label, className, type = 'button', ...rest }: IconButtonProps) {
  return (
    <button type={type} aria-label={label} className={cn('icon-btn', className)} {...rest}>
      <Icon className="i i-lg" aria-hidden />
    </button>
  )
}
