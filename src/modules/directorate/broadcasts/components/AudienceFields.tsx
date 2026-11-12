import { Field, Segmented, SelectInput, type SegmentOption } from '@/components/shared'
import { STATE_OPTIONS } from '../../shared/constants/options'
import type { BroadcastComposer } from '../hooks/use-broadcast-composer'
import type { Audience } from '../types'
import { GroupPicker } from './GroupPicker'
import { ReachLine } from './ReachLine'

const AUDIENCES: SegmentOption<Audience>[] = [{ value: 'leaders', label: 'Leaders' }, { value: 'members', label: 'All members' }]

/** Who gets the message (verified groups only; a state admin always reaches their own state). */
export function AudienceFields({ composer }: { composer: BroadcastComposer }) {
  const { draft, update } = composer
  return (
    <>
      <Field label="To"><Segmented label="Audience" options={AUDIENCES} value={draft.audience} onChange={update('audience')} /></Field>
      <div className="grid-2 mt-4">
        <Field label="State" htmlFor="b-state"><SelectInput id="b-state" options={STATE_OPTIONS} value={draft.state} onChange={(event) => update('state')(event.target.value)} /></Field>
        <Field label="Category" htmlFor="b-cat" className="!mt-0"><SelectInput id="b-cat" options={composer.categoryOptions} value={draft.category} onChange={(event) => update('category')(event.target.value)} /></Field>
      </div>
      <Field label="Group" optional hint="Pick one group to send only to it" className="mt-4">
        <GroupPicker value={draft.group} onChange={update('group')} />
      </Field>
      <ReachLine composer={composer} />
    </>
  )
}
