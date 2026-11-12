import { Eye, EyeOff } from 'lucide-react'
import { useState, type InputHTMLAttributes, type Ref } from 'react'

import { cn } from '@/lib/utils'

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  ref?: Ref<HTMLInputElement>
}

/** Password box with an eye button that shows or hides what's typed. */
export function PasswordInput({ className, ...rest }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  const Icon = visible ? EyeOff : Eye
  return (
    <span className="password-field">
      <input
        className={cn('input', className)}
        type={visible ? 'text' : 'password'}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        {...rest}
      />
      <button
        type="button"
        className="password-toggle"
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
        aria-controls={rest.id}
        // Keep focus (and the phone keyboard) in the box while toggling.
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setVisible((shown) => !shown)}
      >
        <Icon className="i" aria-hidden />
      </button>
    </span>
  )
}
