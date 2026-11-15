import type { UseFormReturn } from 'react-hook-form'

import { AmountInput, Field, SelectInput, TextInput } from '@/components/shared'
import type { Cause } from '@/types/domain'
import type { ChapterOption } from '../types'
import type { OfflinePaymentForm } from '../utils/offline-schema'
import { GENERAL_PURPOSES } from '../utils/purposes'
import { PayerPicker } from './PayerPicker'
import { ProofField } from './ProofField'

interface OfflinePaymentFieldsProps {
  form: UseFormReturn<OfflinePaymentForm>
  causes: Cause[]
  chapters: ChapterOption[]
  leaderName: string
}

const forOptions = (causes: Cause[]) => [
  ...causes.map((cause) => ({ value: cause.id, label: cause.title })),
  ...GENERAL_PURPOSES.map((purpose) => ({ value: `purpose:${purpose.value}`, label: `General: ${purpose.label}` })),
]
const chapterOptions = (chapters: ChapterOption[]) => [{ value: '', label: 'Whole group' }, ...chapters.map((chapter) => ({ value: chapter.id, label: `${chapter.name} chapter` }))]
const METHODS = [{ value: 'transfer', label: 'Bank transfer' }, { value: 'cash', label: 'Cash' }]

export function OfflinePaymentFields({ form, causes, chapters, leaderName }: OfflinePaymentFieldsProps) {
  const { register, watch, setValue, clearErrors, formState: { errors } } = form
  return (
    <>
      <Field label="What was it for?" htmlFor="off-for" error={errors.forId?.message}><SelectInput id="off-for" placeholder="Choose" options={forOptions(causes)} {...register('forId')} /></Field>
      <Field label="Who paid" htmlFor="off-payer" error={errors.payerId?.message}><PayerPicker id="off-payer" value={watch('payerId')} myName={leaderName} invalid={Boolean(errors.payerId)} onChange={(payerId) => { setValue('payerId', payerId); clearErrors('payerId') }} /></Field>
      <Field label="Counts for" htmlFor="off-chapter" error={errors.chapterId?.message}><SelectInput id="off-chapter" options={chapterOptions(chapters)} {...register('chapterId')} /></Field>
      <Field label="Amount" htmlFor="off-amount" error={errors.amount?.message}><AmountInput id="off-amount" {...register('amount')} /></Field>
      <div className="grid-2 !grid-cols-2 mt-4">
        <Field label="Date" htmlFor="off-date" error={errors.date?.message}><TextInput id="off-date" type="date" {...register('date')} /></Field>
        <Field label="Paid by" htmlFor="off-method" className="!mt-0"><SelectInput id="off-method" options={METHODS} {...register('method')} /></Field>
      </div>
      <Field label="Bank reference" htmlFor="off-ref" hint="On the bank alert or transfer receipt." optional className="mt-4"><TextInput id="off-ref" {...register('reference')} /></Field>
      <ProofField fileName={watch('proof')?.name} error={errors.proof?.message} onFile={(file) => setValue('proof', file, { shouldValidate: true })} />
    </>
  )
}
