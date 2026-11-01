import type { UseFormReturn } from 'react-hook-form'

import { Card, Checkbox, KeyValueList, WizardActions } from '@/components/shared'
import { registerSummary } from '../../utils/register-summary'
import type { RegisterGroupValues } from '../../utils/schemas'
import { StepHeading } from '../shared/StepHeading'

interface RegisterCheckStepProps {
  form: UseFormReturn<RegisterGroupValues>
  onBack: () => void
  onSubmit: () => void
  loading: boolean
}

export function RegisterCheckStep({ form, onBack, onSubmit, loading }: RegisterCheckStepProps) {
  const error = form.formState.errors.confirmed?.message
  return (
    <>
      <StepHeading title="Check" />
      <Card className="mt-5"><KeyValueList items={registerSummary(form.getValues())} /></Card>
      <div className="mt-5">
        <Checkbox {...form.register('confirmed')}>This group supports Atiku Abubakar</Checkbox>
        {error && <span className="error-text" role="alert">{error}</span>}
      </div>
      <WizardActions onBack={onBack} onNext={onSubmit} nextLabel="Submit" loading={loading} />
    </>
  )
}
