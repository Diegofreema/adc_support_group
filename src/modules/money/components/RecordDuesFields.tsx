import { Controller, type UseFormReturn } from 'react-hook-form'

import { Field, SelectInput, TextArea, TextInput } from '@/components/shared'
import type { DuesInfo } from '../types'
import { periodChoices } from '../utils/periods'
import type { RecordDuesForm } from '../utils/schemas'
import { MemberPicker } from './MemberPicker'
import { PeriodCount } from './PeriodCount'
import { ProofField } from './ProofField'

interface RecordDuesFieldsProps {
  form: UseFormReturn<RecordDuesForm>
  dues: DuesInfo & { period: NonNullable<DuesInfo['period']>; currentPeriod: string }
}

export function RecordDuesFields({ form, dues }: RecordDuesFieldsProps) {
  const { control, register, watch, setValue, formState: { errors } } = form
  return (
    <>
      <Controller control={control} name="member" render={({ field }) => <MemberPicker label="Member" value={field.value} onChange={field.onChange} error={errors.member?.message} />} />
      <Field label="From" htmlFor="dues-from" error={errors.fromPeriod?.message}>
        <SelectInput id="dues-from" options={periodChoices(dues.currentPeriod, dues.period, dues.startOn)} {...register('fromPeriod')} />
      </Field>
      <Field label="How many" error={errors.periods?.message}>
        <Controller control={control} name="periods" render={({ field }) => <PeriodCount value={field.value} onChange={field.onChange} />} />
      </Field>
      <Field label="Date paid" htmlFor="dues-paid-on" error={errors.paidOn?.message}><TextInput id="dues-paid-on" type="date" {...register('paidOn')} /></Field>
      <ProofField label="Proof" fileName={watch('proof')?.name} error={errors.proof?.message} onFile={(file) => setValue('proof', file, { shouldValidate: true })} />
      <Field label="Note" htmlFor="dues-note" optional error={errors.note?.message}><TextArea id="dues-note" rows={2} maxLength={300} {...register('note')} /></Field>
    </>
  )
}
