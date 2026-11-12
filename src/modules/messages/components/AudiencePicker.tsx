import { ChoiceList, Field, SelectInput, type ChoiceOption } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { Audience, AudienceOption, ChapterAudience } from '../types'

interface AudiencePickerProps {
  audiences: AudienceOption[]
  value: Audience
  onChange: (audience: Audience) => void
  chapters: ChapterAudience[]
  chapterId: string
  onChapterChange: (chapterId: string) => void
}

function toOption(option: AudienceOption): ChoiceOption<Audience> {
  return { value: option.value, title: option.label, trailing: <span className="faint small num">{formatNumber(option.count)}</span> }
}

export function AudiencePicker({ audiences, value, onChange, chapters, chapterId, onChapterChange }: AudiencePickerProps) {
  return (
    <Field label="To">
      <ChoiceList name="audience" label="To" options={audiences.map(toOption)} value={value} onChange={onChange} />
      {value === 'chapter' && (
        <SelectInput
          className="mt-3"
          aria-label="Chapter"
          options={chapters.map((chapter) => ({ value: chapter.id, label: chapter.name }))}
          value={chapterId}
          onChange={(event) => onChapterChange(event.target.value)}
        />
      )}
    </Field>
  )
}
