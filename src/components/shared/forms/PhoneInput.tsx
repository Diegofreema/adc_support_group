import type { InputHTMLAttributes, Ref } from 'react'

interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  ref?: Ref<HTMLInputElement>
}

/** Nigerian phone number with a fixed +234 prefix. */
export function PhoneInput(props: PhoneInputProps) {
  return (
    <div className="input-group">
      <span className="prefix">+234</span>
      <input className="input" inputMode="tel" autoComplete="tel" placeholder="803 123 4567" {...props} />
    </div>
  )
}
