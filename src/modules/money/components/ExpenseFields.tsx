import type { UseFormReturn } from 'react-hook-form'

import { AmountInput, Field, SelectInput, TextInput } from '@/components/shared'
import { CATEGORY_OPTIONS } from '../utils/labels'
import type { ExpenseForm } from '../utils/schemas'
import { ProofField } from './ProofField'

export function ExpenseFields({ form }: { form: UseFormReturn<ExpenseForm> }) {
  const { register, watch, setValue, formState: { errors } } = form
  return (
    <>
      <Field label="Amount" htmlFor="expense-amount" error={errors.amount?.message}><AmountInput id="expense-amount" {...register('amount')} /></Field>
      <Field label="Date" htmlFor="expense-date" error={errors.occurredOn?.message}><TextInput id="expense-date" type="date" {...register('occurredOn')} /></Field>
      <Field label="For" htmlFor="expense-category" error={errors.category?.message}><SelectInput id="expense-category" placeholder="Choose" options={CATEGORY_OPTIONS} {...register('category')} /></Field>
      <Field label="What was it" htmlFor="expense-description" error={errors.description?.message}><TextInput id="expense-description" maxLength={300} placeholder="e.g. Bus to the rally" {...register('description')} /></Field>
      <ProofField label="Receipt" fileName={watch('receipt')?.name} error={errors.receipt?.message} onFile={(file) => setValue('receipt', file, { shouldValidate: true })} />
    </>
  )
}
