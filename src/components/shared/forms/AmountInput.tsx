import type { InputHTMLAttributes, Ref } from 'react'

interface AmountInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  ref?: Ref<HTMLInputElement>
}

/** Big Naira amount field. */
export function AmountInput(props: AmountInputProps) {
  return (
    <div className="amount-input">
      <span aria-hidden>₦</span>
      <input inputMode="numeric" placeholder="0" aria-label="Amount in Naira" {...props} />
    </div>
  )
}
