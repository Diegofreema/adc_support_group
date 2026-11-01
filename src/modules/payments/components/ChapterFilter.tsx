import { SelectInput } from '@/components/shared'
import type { ChapterOption } from '../types'

interface ChapterFilterProps {
  chapters: ChapterOption[]
  value: string
  onChange: (chapter: string) => void
}

export function ChapterFilter({ chapters, value, onChange }: ChapterFilterProps) {
  return (
    <SelectInput
      small
      aria-label="Chapter"
      placeholder="All chapters"
      options={chapters.map((chapter) => chapter.name)}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
