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
  /** Render the child element (e.g. a router Link) with button styles. */
  asChild?: boolean
  children?: ReactNode
}

/** The one button. Primary = the single green action on a screen. */
export function Button({ variant, size, block, icon: Icon, iconEnd: IconEnd, asChild, className, children, type = 'button', ...rest }: ButtonProps) {
  const classes = cn(buttonClassName(variant, size, block), className)
  if (asChild) return <Slot.Root className={classes}>{children}</Slot.Root>
  return (
    <button type={type} className={classes} {...rest}>
      {Icon && <Icon className="i" aria-hidden />}
      {children}
      {IconEnd && <IconEnd className="i" aria-hidden />}
    </button>
  )
}
