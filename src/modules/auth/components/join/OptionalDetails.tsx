import { ChevronDown } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'

import { Field, SelectInput, TextInput } from '@/components/shared'
import type { JoinValues } from '../../utils/schemas'

const GENDERS = ['Female', 'Male']

/** Optional profile fields, folded away by default. */
export function OptionalDetails({ form }: { form: UseFormReturn<JoinValues> }) {
  return (
    <details className="group mt-4">
      <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 font-semibold text-secondary-foreground [&::-webkit-details-marker]:hidden">
        <ChevronDown className="i transition-transform group-open:rotate-180" aria-hidden />
        More <span className="faint">(optional)</span>
      </summary>
      <Field label="Email" htmlFor="join-email" hint="We'll email you instead of SMS when we can." error={form.formState.errors.email?.message} className="mt-2">
        <TextInput id="join-email" type="email" autoComplete="email" {...form.register('email')} />
      </Field>
      <Field label="Gender" htmlFor="join-gender"><SelectInput id="join-gender" options={GENDERS} placeholder="—" {...form.register('gender')} /></Field>
    </details>
  )
}
