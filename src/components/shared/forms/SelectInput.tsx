import type { Ref, SelectHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[] | readonly string[]
  placeholder?: string
  small?: boolean
  ref?: Ref<HTMLSelectElement>
}

function toOption(option: SelectOption | string): SelectOption {
  return typeof option === 'string' ? { value: option, label: option } : option
}

/** Native select: best on cheap phones. */
export function SelectInput({ options, placeholder, small, className, ...rest }: SelectInputProps) {
  return (
    <select className={cn('select', small && 'select-sm', className)} {...rest}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(toOption).map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}
