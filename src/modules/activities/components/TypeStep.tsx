import { ChoiceTiles } from '@/components/shared'
import type { ActivityTypeOption } from '../types'

interface TypeStepProps {
  options: ActivityTypeOption[]
  value: string
  onChange: (value: string) => void
}

export function TypeStep({ options, value, onChange }: TypeStepProps) {
  return (
    <>
      <h1 className="h1">What did you do?</h1>
      <div className="mt-5">
        <ChoiceTiles name="activity-type" label="Activity type" options={options} value={value} onChange={onChange} />
      </div>
    </>
  )
}
