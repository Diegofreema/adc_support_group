import { Banknote, Megaphone, ShieldCheck, UsersRound } from 'lucide-react'

import { ChoiceTiles, Field, type TileOption } from '@/components/shared'
import type { ExportSubject } from '../types'

const SUBJECTS: TileOption<ExportSubject>[] = [
  { value: 'groups', label: 'Groups', icon: ShieldCheck },
  { value: 'members', label: 'Members', icon: UsersRound },
  { value: 'activities', label: 'Activities', icon: Megaphone },
  { value: 'payments', label: 'Payments', icon: Banknote },
]

export function ExportSubjectPicker({ value, onChange }: { value: ExportSubject; onChange: (value: ExportSubject) => void }) {
  return <Field label="What"><ChoiceTiles name="export-subject" label="What to export" options={SUBJECTS} value={value} onChange={onChange} /></Field>
}
