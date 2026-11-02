import { Network, UsersRound } from 'lucide-react'

import { ChoiceList, Field, IconTile, SelectInput, type ChoiceOption } from '@/components/shared'
import type { ChapterOption, PayDraft, Payer } from '../types'

interface PayerStepProps {
  draft: PayDraft
  groupName: string
  chapters: ChapterOption[]
  onChange: (changes: Partial<PayDraft>) => void
}

function payerOptions(groupName: string): ChoiceOption<Payer>[] {
  return [
    { value: 'group', title: 'Whole group', description: groupName, trailing: <IconTile icon={UsersRound} tone="grey" /> },
    { value: 'chapter', title: 'A chapter', description: 'Counts for the group too', trailing: <IconTile icon={Network} tone="grey" /> },
  ]
}

export function PayerStep({ draft, groupName, chapters, onChange }: PayerStepProps) {
  return (
    <>
      <h1 className="h1">Who is paying?</h1>
      <div className="mt-5"><ChoiceList name="payer" label="Who is paying" options={payerOptions(groupName)} value={draft.payer} onChange={(payer) => onChange({ payer })} /></div>
      {draft.payer === 'chapter' && (
        <Field label="Chapter" htmlFor="pay-chapter" className="mt-4">
          <SelectInput id="pay-chapter" placeholder="Choose" options={chapters.map((chapter) => ({ value: chapter.id, label: chapter.name }))} value={draft.chapterId ?? ''} onChange={(event) => onChange({ chapterId: event.target.value || undefined })} />
        </Field>
      )}
    </>
  )
}
