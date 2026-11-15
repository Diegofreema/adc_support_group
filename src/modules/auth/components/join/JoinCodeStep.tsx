import type { UseFormReturn } from 'react-hook-form'

import { WizardActions } from '@/components/shared'
import { formatPhone } from '@/lib/phone'
import type { JoinValues } from '../../utils/schemas'
import { StepHeading } from '../shared/StepHeading'
import { CodeField } from './CodeField'

interface JoinCodeStepProps {
  form: UseFormReturn<JoinValues>
  onBack: () => void
  onNext: () => void
  onResend: () => void
  loading: boolean
}

export function JoinCodeStep({ form, onBack, onNext, onResend, loading }: JoinCodeStepProps) {
  return (
    <>
      <StepHeading title="Enter the code" helper={<>We texted 6 numbers to <b className="num">{formatPhone(form.getValues('phone'))}</b>.</>} />
      <CodeField control={form.control} name="code" error={form.formState.errors.code?.message} />
      <p className="small muted mt-5">Didn't get it? <button type="button" className="text-link !m-0" onClick={onResend}>Send it again</button></p>
      <WizardActions onBack={onBack} onNext={onNext} nextLabel="Verify" loading={loading} />
    </>
  )
}
