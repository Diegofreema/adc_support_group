import { ChoiceTiles, Field, TextInput } from '@/components/shared'
import { GENERAL_PURPOSES } from '../utils/purposes'
import type { GeneralPurposeId } from '../types'

interface GeneralPurposePickerProps {
  purpose: GeneralPurposeId
  note: string
  onPurposeChange: (purpose: GeneralPurposeId) => void
  onNoteChange: (note: string) => void
}

export function GeneralPurposePicker({ purpose, note, onPurposeChange, onNoteChange }: GeneralPurposePickerProps) {
  return (
    <>
      <ChoiceTiles name="purpose" label="Purpose" options={GENERAL_PURPOSES} value={purpose} onChange={onPurposeChange} />
      <Field label="Note" htmlFor="pay-note" optional className="mt-4">
        <TextInput id="pay-note" placeholder="e.g. Buses for Ikeja" value={note} onChange={(event) => onNoteChange(event.target.value)} />
      </Field>
    </>
  )
}
