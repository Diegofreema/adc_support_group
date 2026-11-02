import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid' | 'ink'
export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: '',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
  'danger-solid': 'btn-danger-solid',
  ink: 'btn-dark',
}

const SIZE_CLASS: Record<ButtonSize, string> = { sm: 'btn-sm', md: '', lg: 'btn-lg' }

/** Button classes, for links and Radix triggers that must look like buttons. */
export function buttonClassName(variant: ButtonVariant = 'secondary', size: ButtonSize = 'md', block = false): string {
  return cn('btn', VARIANT_CLASS[variant], SIZE_CLASS[size], block && 'btn-block')
}
