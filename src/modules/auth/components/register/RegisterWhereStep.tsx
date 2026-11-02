import type { UseFormReturn } from 'react-hook-form'

import { Segmented, WizardActions, type SegmentOption } from '@/components/shared'
import type { RegisterGroupValues } from '../../utils/schemas'
import { StepHeading } from '../shared/StepHeading'
import { AbroadFields } from './AbroadFields'
import { NigeriaFields } from './NigeriaFields'

const LOCATIONS: SegmentOption<RegisterGroupValues['location']>[] = [
  { value: 'nigeria', label: 'Nigeria' },
  { value: 'abroad', label: 'Abroad' },
]

interface RegisterWhereStepProps {
  form: UseFormReturn<RegisterGroupValues>
  onBack: () => void
  onNext: () => void
}

export function RegisterWhereStep({ form, onBack, onNext }: RegisterWhereStepProps) {
  const location = form.watch('location')
  return (
    <>
      <StepHeading title="Where" />
      <div className="mt-5">
        <Segmented options={LOCATIONS} value={location} onChange={(next) => form.setValue('location', next)} label="Where is the group?" />
      </div>
      {location === 'nigeria' ? <NigeriaFields form={form} /> : <AbroadFields form={form} />}
      <WizardActions onBack={onBack} onNext={onNext} />
    </>
  )
}
