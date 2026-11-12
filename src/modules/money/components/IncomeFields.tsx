import { Controller, type UseFormReturn } from 'react-hook-form'

import { AmountInput, Field, TextInput } from '@/components/shared'
import type { IncomeForm } from '../utils/schemas'
import { MemberPicker } from './MemberPicker'
import { ProofField } from './ProofField'

export function IncomeFields({ form }: { form: UseFormReturn<IncomeForm> }) {
  const { control, register, watch, setValue, formState: { errors } } = form
  return (
    <>
      <Field label="Amount" htmlFor="income-amount" error={errors.amount?.message}><AmountInput id="income-amount" {...register('amount')} /></Field>
      <Field label="Date" htmlFor="income-date" error={errors.occurredOn?.message}><TextInput id="income-date" type="date" {...register('occurredOn')} /></Field>
      <Field label="Where it came from" htmlFor="income-description" error={errors.description?.message}><TextInput id="income-description" maxLength={300} placeholder="e.g. Gift from a friend" {...register('description')} /></Field>
      <Controller control={control} name="member" render={({ field }) => <MemberPicker label="From a member" optional value={field.value} onChange={field.onChange} />} />
      <ProofField label="Proof" optional fileName={watch('proof')?.name} error={errors.proof?.message} onFile={(file) => setValue('proof', file, { shouldValidate: true })} />
    </>
  )
}
