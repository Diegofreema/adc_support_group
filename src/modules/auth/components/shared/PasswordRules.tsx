import { Check, Circle } from 'lucide-react'

import type { PasswordRule } from '../../utils/password-rules'
import { cn } from '@/lib/utils'

/** Live checklist under a new-password field. */
export function PasswordRules({ rules }: { rules: PasswordRule[] }) {
  return (
    <ul className="mt-2.5 grid gap-1.5 text-sm text-muted-foreground" aria-label="Password rules">
      {rules.map((rule) => (
        <li key={rule.label} className={cn('flex items-center gap-2', rule.ok && 'text-primary')}>
          {rule.ok ? <Check className="i i-sm" aria-hidden /> : <Circle className="i i-sm" aria-hidden />}
          {rule.label}
        </li>
      ))}
    </ul>
  )
}
