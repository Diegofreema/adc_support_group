import { useNavigate } from '@tanstack/react-router'
import { ClipboardPaste } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'

import { Field, TextInput } from '@/components/shared'
import { joinCodeFrom } from '@/lib/share'

interface JoinCodeFormProps {
  id: string
  /** The buttons; the submit one opens the join page. */
  actions: ReactNode
  onOpened?: () => void
}

const canPaste = typeof navigator !== 'undefined' && Boolean(navigator.clipboard?.readText)

/** Paste an invite link or type the code, then open /join/<code>. */
export function JoinCodeForm({ id, actions, onOpened }: JoinCodeFormProps) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [error, setError] = useState<string>()

  const open = (input: string) => {
    const code = joinCodeFrom(input)
    if (!code) {
      setError("That doesn't look like an invite link. Copy the whole link from your message and paste it here.")
      return
    }
    onOpened?.()
    navigate({ to: '/join/$code', params: { code } })
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    open(value)
  }

  // One tap instead of long-press → Paste; a pasted link opens straight away.
  const paste = async () => {
    try {
      const text = (await navigator.clipboard.readText()).trim()
      if (!text) return
      setValue(text)
      setError(undefined)
      if (joinCodeFrom(text)) open(text)
    } catch {
      // Permission refused: they can still paste by hand.
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <Field
        label="Invite link"
        htmlFor={id}
        error={error}
        aside={canPaste ? <button type="button" className="text-link" onClick={paste}><ClipboardPaste className="i i-sm" aria-hidden />Paste</button> : undefined}
      >
        <TextInput
          id={id}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Paste the link or type the code"
          value={value}
          onChange={(event) => { setValue(event.target.value); setError(undefined) }}
        />
      </Field>
      {actions}
    </form>
  )
}
