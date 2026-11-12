import type { UseFormReturn } from 'react-hook-form'

import { AmountInput, Field, SelectInput, TextInput } from '@/components/shared'
import type { Cause } from '@/types/domain'
import type { ChapterOption, PayerOption } from '../types'
import type { OfflinePaymentForm } from '../utils/offline-schema'
import { GENERAL_PURPOSES } from '../utils/purposes'
import { ProofField } from './ProofField'

interface OfflinePaymentFieldsProps {
  form: UseFormReturn<OfflinePaymentForm>
  causes: Cause[]
  chapters: ChapterOption[]
  payers: PayerOption[]
  leaderName: string
}

const forOptions = (causes: Cause[]) => [
  ...causes.map((cause) => ({ value: cause.id, label: cause.title })),
  ...GENERAL_PURPOSES.map((purpose) => ({ value: `purpose:${purpose.value}`, label: `General: ${purpose.label}` })),
]
const chapterOptions = (chapters: ChapterOption[]) => [{ value: '', label: 'Whole group' }, ...chapters.map((chapter) => ({ value: chapter.id, label: `${chapter.name} chapter` }))]
const payerOptions = (payers: PayerOption[], leaderName: string) => [{ value: '', label: `${leaderName} (you)` }, ...payers.map((payer) => ({ value: payer.id, label: payer.name }))]
const METHODS = [{ value: 'transfer', label: 'Transfer' }, { value: 'cash', label: 'Cash' }]

export function OfflinePaymentFields({ form, causes, chapters, payers, leaderName }: OfflinePaymentFieldsProps) {
  const { register, watch, setValue, formState: { errors } } = form
  return (
    <>
      <Field label="For" htmlFor="off-for" error={errors.forId?.message}><SelectInput id="off-for" placeholder="Choose" options={forOptions(causes)} {...register('forId')} /></Field>
      <Field label="Paid by" htmlFor="off-payer" error={errors.payerId?.message}><SelectInput id="off-payer" options={payerOptions(payers, leaderName)} {...register('payerId')} /></Field>
      <Field label="Counts for" htmlFor="off-chapter" error={errors.chapterId?.message}><SelectInput id="off-chapter" options={chapterOptions(chapters)} {...register('chapterId')} /></Field>
      <Field label="Amount" htmlFor="off-amount" error={errors.amount?.message}><AmountInput id="off-amount" {...register('amount')} /></Field>
      <div className="grid-2 !grid-cols-2 mt-4">
        <Field label="Date" htmlFor="off-date" error={errors.date?.message}><TextInput id="off-date" type="date" {...register('date')} /></Field>
        <Field label="How" htmlFor="off-method" className="!mt-0"><SelectInput id="off-method" options={METHODS} {...register('method')} /></Field>
      </div>
      <Field label="Reference" htmlFor="off-ref" optional className="mt-4"><TextInput id="off-ref" placeholder="Bank reference" {...register('reference')} /></Field>
      <ProofField fileName={watch('proof')?.name} error={errors.proof?.message} onFile={(file) => setValue('proof', file, { shouldValidate: true })} />
    </>
  )
}
