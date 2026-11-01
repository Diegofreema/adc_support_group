import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children: ReactNode
  ref?: Ref<HTMLInputElement>
}

export function Checkbox({ children, ...rest }: CheckboxProps) {
  return (
    <label className="check">
      <input type="checkbox" {...rest} />
      <span>{children}</span>
    </label>
  )
}
