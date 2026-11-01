import { Slot } from 'radix-ui'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid' | 'ink'
export type ButtonSize = 'sm' | 'md' | 'lg'

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

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: '',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
  'danger-solid': 'btn-danger-solid',
  ink: 'btn-dark',
}

const SIZE_CLASS: Record<ButtonSize, string> = { sm: 'btn-sm', md: '', lg: 'btn-lg' }

export function buttonClassName(variant: ButtonVariant = 'secondary', size: ButtonSize = 'md', block = false): string {
  return cn('btn', VARIANT_CLASS[variant], SIZE_CLASS[size], block && 'btn-block')
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
