import type { ChangeEvent, InputHTMLAttributes, Ref } from 'react'

interface AmountInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  ref?: Ref<HTMLInputElement>
}

const MAX_DIGITS = 10

/** "₦5,000" / "5000" / "5 000" → "5,000": commas appear as you type, anything else is dropped. */
function tidy(value: string): string {
  const digits = value.replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, MAX_DIGITS)
  return digits ? Number(digits).toLocaleString('en-NG') : ''
}

/** Big Naira amount field. Accepts any way of typing a number and shows it with commas. */
export function AmountInput({ onChange, ...props }: AmountInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = tidy(event.target.value)
    onChange?.(event)
  }
  return (
    <div className="amount-input">
      <span aria-hidden>₦</span>
      <input inputMode="numeric" autoComplete="off" placeholder="0" aria-label="Amount in Naira" {...props} onChange={handleChange} />
    </div>
  )
}
