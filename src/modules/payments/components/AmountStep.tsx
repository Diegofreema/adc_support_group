import { AmountInput, Field, SelectInput } from '@/components/shared'
import { formatDay } from '@/lib/format'
import { formatAmountInput, parseAmount } from '../utils/amount'
import type { ActivityOption, ChapterOption, PayDraft } from '../types'
import { QuickAmounts } from './QuickAmounts'

interface AmountStepProps {
  draft: PayDraft
  activities: ActivityOption[]
  chapters: ChapterOption[]
  /** Shown for "no chapter picked" (the backend's default). */
  defaultChapterLabel: string
  onChange: (changes: Partial<PayDraft>) => void
}

function activityOptions(activities: ActivityOption[]) {
  return activities.map((activity) => ({ value: activity.id, label: `${activity.title} · ${formatDay(activity.date)}` }))
}

function chapterOptions(chapters: ChapterOption[]) {
  return chapters.map((chapter) => ({ value: chapter.id, label: `${chapter.name} chapter` }))
}

export function AmountStep({ draft, activities, chapters, defaultChapterLabel, onChange }: AmountStepProps) {
  return (
    <>
      <h1 className="h1">Amount</h1>
      <div className="mt-5"><AmountInput value={formatAmountInput(draft.amount)} onChange={(event) => onChange({ amount: parseAmount(event.target.value) })} /></div>
      <div className="mt-3"><QuickAmounts value={draft.amount} onPick={(amount) => onChange({ amount })} /></div>
      <Field label="Link activity" htmlFor="pay-activity" optional className="mt-6">
        <SelectInput id="pay-activity" placeholder="None" options={activityOptions(activities)} value={draft.activityId ?? ''} onChange={(event) => onChange({ activityId: event.target.value || undefined })} />
      </Field>
      {chapters.length > 0 && (
        <Field label="Counts for" htmlFor="pay-chapter" optional className="mt-4">
          <SelectInput id="pay-chapter" placeholder={defaultChapterLabel} options={chapterOptions(chapters)} value={draft.chapterId ?? ''} onChange={(event) => onChange({ chapterId: event.target.value || undefined })} />
        </Field>
      )}
    </>
  )
}
