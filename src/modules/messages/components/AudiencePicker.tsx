import { ChoiceList, Field, type ChoiceOption } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { Audience, AudienceOption } from '../types'

interface AudiencePickerProps {
  audiences: AudienceOption[]
  value: Audience
  onChange: (audience: Audience) => void
}

function toOption(option: AudienceOption): ChoiceOption<Audience> {
  return { value: option.value, title: option.label, trailing: <span className="faint small num">{formatNumber(option.count)}</span> }
}

export function AudiencePicker({ audiences, value, onChange }: AudiencePickerProps) {
  return (
    <Field label="To">
      <ChoiceList name="audience" label="To" options={audiences.map(toOption)} value={value} onChange={onChange} />
    </Field>
  )
}
