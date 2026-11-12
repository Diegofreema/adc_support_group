import { Controller, type UseFormReturn } from 'react-hook-form'

import { AmountInput, Card, Field, Segmented, TextInput, Toggle } from '@/components/shared'
import { PERIOD_OPTIONS } from '../utils/periods'
import type { DuesSettingsForm } from '../utils/schemas'

const START_HINT = { month: 'Counts from the 1st of that month', quarter: 'Counts from the start of that quarter', year: 'Counts from 1 January of that year' }

/** On/off, then (when on) amount, how often and the first period. */
export function DuesSettingsFields({ form }: { form: UseFormReturn<DuesSettingsForm> }) {
  const { control, register, watch, formState: { errors } } = form
  const enabled = watch('enabled')
  return (
    <>
      <Card className="row-between">
        <span className="bold">{enabled ? 'Dues are on' : 'Dues are off'}</span>
        <Controller control={control} name="enabled" render={({ field }) => <Toggle checked={field.value} onChange={field.onChange} label="Dues on" />} />
      </Card>
      {enabled && (
        <>
          <Field label="Amount" htmlFor="dues-amount" error={errors.amount?.message}><AmountInput id="dues-amount" {...register('amount')} /></Field>
          <Field label="How often">
            <Controller control={control} name="period" render={({ field }) => <Segmented options={PERIOD_OPTIONS} value={field.value} onChange={field.onChange} label="How often" />} />
          </Field>
          <Field label="First period" htmlFor="dues-start" hint={START_HINT[watch('period')]} error={errors.startOn?.message}><TextInput id="dues-start" type="date" {...register('startOn')} /></Field>
        </>
      )}
    </>
  )
}
