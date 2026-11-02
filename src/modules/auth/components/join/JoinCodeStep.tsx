import type { UseFormReturn } from 'react-hook-form'

import { Button, WizardActions } from '@/components/shared'
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
      <StepHeading title="Enter code" helper={`Sent to ${form.getValues('phone')}`} />
      <CodeField control={form.control} name="code" error={form.formState.errors.code?.message} />
      <Button variant="ghost" size="sm" className="mt-3" onClick={onResend}>Resend</Button>
      <WizardActions onBack={onBack} onNext={onNext} nextLabel="Verify" loading={loading} />
    </>
  )
}
