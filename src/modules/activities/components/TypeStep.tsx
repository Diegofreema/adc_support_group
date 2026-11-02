import { ChoiceTiles } from '@/components/shared'
import { ACTIVITY_TYPES } from '@/config/activity-types'
import type { ActivityTypeId } from '../types'

interface TypeStepProps {
  value: ActivityTypeId
  onChange: (value: ActivityTypeId) => void
}

export function TypeStep({ value, onChange }: TypeStepProps) {
  return (
    <>
      <h1 className="h1">What did you do?</h1>
      <div className="mt-5">
        <ChoiceTiles name="activity-type" label="Activity type" options={ACTIVITY_TYPES} value={value} onChange={onChange} />
      </div>
    </>
  )
}
