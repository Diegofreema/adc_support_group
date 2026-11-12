import { Ban } from 'lucide-react'

import { Button, Field, KeyValueList, Modal, StatusChip, TextArea, type KeyValue } from '@/components/shared'
import { formatDateTime, formatDay, formatNaira } from '@/lib/format'
import type { EntryDetail } from '../hooks/use-entry-detail'
import type { MoneyEntry } from '../types'
import { entryTitle, KIND_LABELS, CATEGORY_LABELS } from '../utils/labels'
import { ProofPreview } from './ProofPreview'

function details(entry: MoneyEntry): KeyValue[] {
  const rows: (KeyValue | false)[] = [
    { label: 'Amount', value: formatNaira(entry.amount) },
    { label: 'Type', value: KIND_LABELS[entry.kind] },
    { label: 'Date', value: formatDay(entry.occurredOn) },
    Boolean(entry.profileName) && { label: entry.kind === 'dues' ? 'Member' : 'From', value: entry.profileName },
    entry.periods.length > 0 && { label: 'For', value: entry.periods.join(', ') },
    Boolean(entry.category) && { label: 'For', value: CATEGORY_LABELS[entry.category!] },
    entry.kind === 'dues' && Boolean(entry.description) && { label: 'Note', value: entry.description },
    { label: 'Recorded by', value: entry.recordedByName ?? '—' },
    { label: 'Recorded on', value: formatDateTime(entry.createdAt) },
    entry.voided && { label: 'Voided', value: <><StatusChip status="rejected" label="Voided" /> {entry.voidReason}</> },
  ]
  return rows.filter((row): row is KeyValue => Boolean(row))
}

/** Tap a record: proof + details. The treasurer can void it with a reason. */
export function EntryDetailModal({ detail, canVoid }: { detail: EntryDetail; canVoid: boolean }) {
  const entry = detail.entry
  if (!entry) return null
  const actions = detail.voiding ? <VoidActions detail={detail} /> : <ViewActions detail={detail} canVoid={canVoid && !entry.voided} />
  return (
    <Modal open onOpenChange={(open) => !open && detail.close()} title={detail.voiding ? 'Void this entry?' : entryTitle(entry)} description={detail.voiding ? 'It stays in the records, marked void. It no longer counts.' : undefined} actions={actions}>
      {detail.voiding ? <VoidReason detail={detail} /> : <><ProofPreview path={entry.proofPath} url={detail.proofUrl} loading={detail.proofLoading} /><KeyValueList items={details(entry)} /></>}
    </Modal>
  )
}

function VoidReason({ detail }: { detail: EntryDetail }) {
  return (
    <Field label="Why is it wrong?" htmlFor="money-void-reason">
      <TextArea id="money-void-reason" rows={3} maxLength={300} value={detail.reason} placeholder="e.g. Wrong amount" onChange={(event) => detail.setReason(event.target.value)} />
    </Field>
  )
}

function ViewActions({ detail, canVoid }: { detail: EntryDetail; canVoid: boolean }) {
  return (
    <>
      {canVoid && <Button variant="danger" icon={Ban} onClick={detail.startVoid}>Void</Button>}
      <Button onClick={detail.close}>Close</Button>
    </>
  )
}

function VoidActions({ detail }: { detail: EntryDetail }) {
  const ready = detail.reason.trim().length > 0
  return (
    <>
      <Button onClick={detail.stopVoid}>Back</Button>
      <Button variant="danger-solid" disabled={!ready || detail.busy} onClick={detail.confirmVoid}>{detail.busy ? 'Wait…' : 'Void entry'}</Button>
    </>
  )
}
