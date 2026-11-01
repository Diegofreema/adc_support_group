import { useRef, type ChangeEvent, type KeyboardEvent } from 'react'

export const OTP_LENGTH = 6

function replaceAt(value: string, index: number, digit: string): string {
  const chars = value.padEnd(OTP_LENGTH, ' ').split('')
  chars[index] = digit || ' '
  return chars.join('').trimEnd()
}

/** Focus and typing behaviour for six one-digit boxes. */
export function useOtpInputs(value: string, onChange: (value: string) => void) {
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

  const register = (index: number) => (element: HTMLInputElement | null) => { inputs.current[index] = element }

  return { handleChange, handleKeyDown, register }
}
