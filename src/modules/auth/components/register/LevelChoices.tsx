import { ChoiceList, type ChoiceOption } from '@/components/shared'
import type { RegisterGroupValues } from '../../utils/schemas'

type Level = RegisterGroupValues['level']

const LEVELS: ChoiceOption<Level>[] = [
  { value: 'national', title: 'National', description: 'All of Nigeria' },
  { value: 'state', title: 'State', description: 'One state' },
  { value: 'lga', title: 'LGA', description: 'One local government' },
  { value: 'ward', title: 'Ward', description: 'One ward' },
]

/** Two-column radio cards for how far the group reaches. */
export function LevelChoices({ value, onChange }: { value: Level; onChange: (level: Level) => void }) {
  return (
    <div className="[&_.choices]:grid-cols-2">
      <ChoiceList name="level" label="Level" options={LEVELS} value={value} onChange={onChange} />
    </div>
  )
}
