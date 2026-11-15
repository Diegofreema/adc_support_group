import { Slot } from 'radix-ui'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonClassName, type ButtonSize, type ButtonVariant } from './button-class'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  block?: boolean
  icon?: LucideIcon
  iconEnd?: LucideIcon
  /** Working on it: shows a spinner, blocks repeat taps, keeps the button solid. */
  loading?: boolean
  /** Render the child element (e.g. a router Link) with button styles. */
  asChild?: boolean
  children?: ReactNode
}

/** The one button. Primary = the single green action on a screen. */
export function Button({ variant, size, block, icon: Icon, iconEnd: IconEnd, loading, asChild, className, children, disabled, type = 'button', ...rest }: ButtonProps) {
  const classes = cn(buttonClassName(variant, size, block), className)
  if (asChild) return <Slot.Root className={classes}>{children}</Slot.Root>
  return (
    <button type={type} className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <span className="spinner" aria-hidden /> : Icon && <Icon className="i" aria-hidden />}
      {children}
      {IconEnd && !loading && <IconEnd className="i" aria-hidden />}
    </button>
  )
}
