import { ChevronDown } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'

import { Field, SelectInput, TextInput } from '@/components/shared'
import type { JoinValues } from '../../utils/schemas'

const GENDERS = ['Female', 'Male']
const AGE_RANGES = ['18–24', '25–34', '35–49', '50+']

/** Optional profile fields, folded away by default. */
export function OptionalDetails({ form }: { form: UseFormReturn<JoinValues> }) {
  return (
    <details className="group mt-4">
      <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 font-semibold text-secondary-foreground [&::-webkit-details-marker]:hidden">
        <ChevronDown className="i transition-transform group-open:rotate-180" aria-hidden />
        More <span className="faint">(optional)</span>
      </summary>
      <Field label="Email" htmlFor="join-email" error={form.formState.errors.email?.message} className="mt-2">
        <TextInput id="join-email" type="email" autoComplete="email" {...form.register('email')} />
      </Field>
      <div className="grid-2 mt-4 !grid-cols-2">
        <Field label="Gender" htmlFor="join-gender"><SelectInput id="join-gender" options={GENDERS} placeholder="—" {...form.register('gender')} /></Field>
        <Field label="Age" htmlFor="join-age" className="!mt-0"><SelectInput id="join-age" options={AGE_RANGES} placeholder="—" {...form.register('ageRange')} /></Field>
      </div>
      <Field label="Occupation" htmlFor="join-job"><TextInput id="join-job" {...form.register('occupation')} /></Field>
      <Field label="Polling unit" htmlFor="join-pu"><TextInput id="join-pu" placeholder="e.g. 24-05-04-012" {...form.register('pollingUnit')} /></Field>
    </details>
  )
}
