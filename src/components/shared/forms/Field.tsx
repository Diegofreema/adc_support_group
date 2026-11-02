import { CircleAlert } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface FieldProps {
  label: string
  htmlFor?: string
  hint?: string
  error?: string
  optional?: boolean
  /** Extra element on the label row (e.g. "Forgot?"). */
  aside?: ReactNode
  className?: string
  children: ReactNode
}

/** Label above, control, then hint or error. */
export function Field({ label, htmlFor, hint, error, optional, aside, className, children }: FieldProps) {
  return (
    <div className={cn('field', error && 'has-error', className)}>
      <div className="row-between">
        <label className="label" htmlFor={htmlFor}>
          {label} {optional && <span className="opt">(optional)</span>}
        </label>
        {aside}
      </div>
      {hint && <span className="hint">{hint}</span>}
      {children}
      {error && <FieldError message={error} />}
    </div>
  )
}

function FieldError({ message }: { message: string }) {
  return (
    <span className="error-text" role="alert">
      <CircleAlert className="i i-sm" aria-hidden />
      {message}
    </span>
  )
}
