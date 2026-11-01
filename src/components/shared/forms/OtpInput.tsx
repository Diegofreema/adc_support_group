import { useRef, type ChangeEvent, type KeyboardEvent } from 'react'

const LENGTH = 6

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

function replaceAt(value: string, index: number, digit: string): string {
  const chars = value.padEnd(LENGTH, ' ').split('')
  chars[index] = digit || ' '
  return chars.join('').trimEnd()
}

/** Six boxes; typing moves forward, backspace moves back. */
export function OtpInput({ value, onChange, label = 'Code' }: OtpInputProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const focus = (index: number) => inputs.current[index]?.focus()

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const digit = event.target.value.replace(/\D/g, '').slice(-1)
    onChange(replaceAt(value, index, digit))
    if (digit) focus(index + 1)
  }

  const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !value[index]?.trim()) focus(index - 1)
  }

  return (
    <div className="otp" role="group" aria-label={label}>
      {Array.from({ length: LENGTH }, (_, index) => (
        <input
          key={index}
          ref={(element) => { inputs.current[index] = element }}
          className="input"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          aria-label={`Digit ${index + 1}`}
          value={value[index]?.trim() ?? ''}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
        />
      ))}
    </div>
  )
}
