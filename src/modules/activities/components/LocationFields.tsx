import type { UseFormReturn } from 'react-hook-form'

import { Field, SelectInput } from '@/components/shared'
import { useLocationOptions } from '../hooks/use-location-options'
import type { ActivityDetailsForm } from '../utils/activity-schema'

/** State, LGA and ward selects bound to the details form. */
export function LocationFields({ form }: { form: UseFormReturn<ActivityDetailsForm> }) {
  const { register, watch, formState: { errors } } = form
  const options = useLocationOptions(watch('state'), watch('lga'))
  return (
    <>
      <Field label="State" htmlFor="act-state" error={errors.state?.message}>
        <SelectInput id="act-state" placeholder="Choose" options={options.states} {...register('state', { onChange: () => form.setValue('lga', '') })} />
      </Field>
      <div className="grid-2 !grid-cols-2 mt-4">
        <Field label="LGA" htmlFor="act-lga" error={errors.lga?.message}>
          <SelectInput id="act-lga" placeholder="Choose" options={options.lgas} {...register('lga', { onChange: () => form.setValue('ward', '') })} />
        </Field>
        <Field label="Ward" htmlFor="act-ward" error={errors.ward?.message} className="!mt-0">
          <SelectInput id="act-ward" placeholder="Choose" options={options.wards} {...register('ward')} />
        </Field>
      </div>
    </>
  )
}
