import { useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent, type ReactNode } from 'react'

import { Field, TextInput } from '@/components/shared'
import { joinCodeFrom } from '@/lib/share'

interface JoinCodeFormProps {
  id: string
  /** The buttons; the submit one opens the join page. */
  actions: ReactNode
  onOpened?: () => void
}

/** Paste an invite link or type the code, then open /join/<code>. */
export function JoinCodeForm({ id, actions, onOpened }: JoinCodeFormProps) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [error, setError] = useState<string>()

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const code = joinCodeFrom(value)
    if (!code) {
      setError('Paste the whole link, or type the code after /join/')
      return
    }
    onOpened?.()
    navigate({ to: '/join/$code', params: { code } })
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <Field label="Invite link or code" htmlFor={id} error={error}>
        <TextInput
          id={id}
          autoComplete="off"
          autoCapitalize="none"
          placeholder="…/join/atiku-women-x7k2"
          value={value}
          onChange={(event) => { setValue(event.target.value); setError(undefined) }}
        />
      </Field>
      {actions}
    </form>
  )
}
