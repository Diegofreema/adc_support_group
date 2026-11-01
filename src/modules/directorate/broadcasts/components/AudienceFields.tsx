import { Field, Segmented, SelectInput, TextInput, type SegmentOption } from '@/components/shared'
import { CATEGORY_OPTIONS, STATE_OPTIONS } from '../../shared/constants/options'
import type { BroadcastComposer } from '../hooks/use-broadcast-composer'
import type { Audience } from '../types'

const AUDIENCES: SegmentOption<Audience>[] = [{ value: 'leaders', label: 'Leaders' }, { value: 'members', label: 'All members' }]

/** Who gets the message. */
export function AudienceFields({ composer }: { composer: BroadcastComposer }) {
  const { draft, update } = composer
  return (
    <>
      <Field label="To"><Segmented label="Audience" options={AUDIENCES} value={draft.audience} onChange={update('audience')} /></Field>
      <div className="grid-2 mt-4">
        <Field label="State" htmlFor="b-state"><SelectInput id="b-state" options={STATE_OPTIONS} value={draft.state} onChange={(event) => update('state')(event.target.value)} /></Field>
        <Field label="Category" htmlFor="b-cat" className="!mt-0"><SelectInput id="b-cat" options={CATEGORY_OPTIONS} value={draft.category} onChange={(event) => update('category')(event.target.value)} /></Field>
      </div>
      <Field label="Group" htmlFor="b-group" optional className="mt-4">
        <TextInput id="b-group" placeholder="Search group" value={draft.group} onChange={(event) => update('group')(event.target.value)} />
      </Field>
    </>
  )
}
