import type { InputHTMLAttributes, Ref } from 'react'

import { cn } from '@/lib/utils'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>
}

export function TextInput({ className, ...rest }: TextInputProps) {
  return <input className={cn('input', className)} {...rest} />
}
