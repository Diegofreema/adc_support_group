import { Segmented } from '@/components/shared'
import type { Cause } from '@/types/domain'
import type { PayDraft, PayFor } from '../types'
import { CauseChoices } from './CauseChoices'
import { GeneralPurposePicker } from './GeneralPurposePicker'

interface PayForStepProps {
  draft: PayDraft
  causes: Cause[]
  onChange: (changes: Partial<PayDraft>) => void
}

const OPTIONS: { value: PayFor; label: string }[] = [
  { value: 'cause', label: 'Cause' },
  { value: 'general', label: 'General' },
]

export function PayForStep({ draft, causes, onChange }: PayForStepProps) {
  return (
    <>
      <h1 className="h1">Pay for</h1>
      <div className="mt-5"><Segmented options={OPTIONS} value={draft.payFor} onChange={(payFor) => onChange({ payFor })} label="Pay for" /></div>
      <div className="mt-4">
        {draft.payFor === 'cause'
          ? <CauseChoices causes={causes} value={draft.causeId} onChange={(causeId) => onChange({ causeId })} />
          : <GeneralPurposePicker purpose={draft.purpose} note={draft.note} onPurposeChange={(purpose) => onChange({ purpose })} onNoteChange={(note) => onChange({ note })} />}
      </div>
    </>
  )
}
