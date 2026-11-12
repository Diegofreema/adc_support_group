import { useEffect, useRef, type ChangeEvent, type KeyboardEvent } from 'react'

export const OTP_LENGTH = 6

/** Write `digits` into the code starting at `index`. */
function writeAt(value: string, index: number, digits: string): string {
  const chars = value.padEnd(OTP_LENGTH, ' ').split('')
  if (!digits) chars[index] = ' '
  for (let offset = 0; offset < digits.length && index + offset < OTP_LENGTH; offset++) chars[index + offset] = digits[offset]!
  return chars.join('').trimEnd()
}

/**
 * Focus and typing behaviour for six one-digit boxes. A paste or the phone's
 * code autofill lands several digits in one box; they spread across the rest.
 */
export function useOtpInputs(value: string, onChange: (value: string) => void) {
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  // Fast typing fires the next change before React re-renders with the last one.
  const latest = useRef(value)
  useEffect(() => { latest.current = value }, [value])
  const focus = (index: number) => inputs.current[Math.min(index, OTP_LENGTH - 1)]?.focus()

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const typed = event.target.value.replace(/\D/g, '')
    const previous = latest.current[index]?.trim() ?? ''
    // Typing into a box that already held a digit: keep only the new one.
    const digits = previous && typed.length === 2 ? typed.replace(previous, '') : typed
    const next = writeAt(latest.current, index, digits)
    latest.current = next
    onChange(next)
    if (digits) focus(index + digits.length)
  }

  const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !latest.current[index]?.trim()) focus(index - 1)
  }

  const register = (index: number) => (element: HTMLInputElement | null) => { inputs.current[index] = element }

  return { handleChange, handleKeyDown, register }
}
