import type { UseFormReturn } from 'react-hook-form'

import { Field, SelectInput, TextInput } from '@/components/shared'
import { COUNTRIES } from '@/lib/geo/places'
import type { RegisterGroupValues } from '../../utils/schemas'

export function AbroadFields({ form }: { form: UseFormReturn<RegisterGroupValues> }) {
  const errors = form.formState.errors
  return (
    <>
      <Field label="Country" htmlFor="reg-country" error={errors.country?.message} className="mt-5">
        <SelectInput id="reg-country" options={COUNTRIES} placeholder="Choose" {...form.register('country')} />
      </Field>
      <Field label="City" htmlFor="reg-city" error={errors.city?.message}>
        <TextInput id="reg-city" placeholder="London" {...form.register('city')} />
      </Field>
    </>
  )
}
