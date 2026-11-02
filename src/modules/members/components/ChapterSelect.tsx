import { Field, SelectInput } from '@/components/shared'
import type { ChapterOption } from '../types'

interface ChapterSelectProps {
  id: string
  label?: string
  chapters: ChapterOption[]
  value: string
  onChange: (chapterId: string) => void
}

/** "Whole group" or one chapter. */
export function ChapterSelect({ id, label = 'Chapter', chapters, value, onChange }: ChapterSelectProps) {
  const options = [{ value: '', label: 'Whole group' }, ...chapters.map((chapter) => ({ value: chapter.id, label: chapter.name }))]
  return (
    <Field label={label} htmlFor={id}>
      <SelectInput id={id} options={options} value={value} onChange={(event) => onChange(event.target.value)} />
    </Field>
  )
}
