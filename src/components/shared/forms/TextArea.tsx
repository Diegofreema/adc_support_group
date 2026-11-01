import type { Ref, TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>
}

export function TextArea({ className, ...rest }: TextAreaProps) {
  return <textarea className={cn('textarea', className)} {...rest} />
}
