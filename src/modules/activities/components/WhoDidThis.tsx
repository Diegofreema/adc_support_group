import { Field, List, ListItem, Avatar, Button, SearchInput, Segmented, type SegmentOption } from '@/components/shared'
import type { MemberChoice, WhoMode } from '../hooks/use-member-choice'
import type { MemberOption } from '../types'

const MODES: SegmentOption<WhoMode>[] = [
  { value: 'me', label: 'Me' },
  { value: 'member', label: 'A member' },
]

/** Record for yourself or pick the member who did it. */
export function WhoDidThis({ choice }: { choice: MemberChoice }) {
  return (
    <Field label="Who did this?" error={choice.error} className="mt-5">
      <Segmented options={MODES} value={choice.mode} onChange={choice.setMode} label="Who did this?" />
      {choice.mode === 'member' && <div className="mt-3"><MemberPicker choice={choice} /></div>}
    </Field>
  )
}

function MemberPicker({ choice }: { choice: MemberChoice }) {
  if (choice.member) return <PickedMember member={choice.member} onChange={() => choice.pick(undefined)} />
  return (
    <>
      <SearchInput value={choice.search} onChange={choice.setSearch} placeholder="Name or phone" />
      <MemberResults members={choice.results} searching={choice.isSearching} onPick={choice.pick} />
    </>
  )
}

function MemberResults({ members, searching, onPick }: { members: MemberOption[]; searching: boolean; onPick: (member: MemberOption) => void }) {
  if (members.length === 0) return <p className="small muted mt-2">{searching ? 'Looking…' : 'No one found'}</p>
  return (
    <List className="mt-2">
      {members.map((member) => (
        <ListItem key={member.id} leading={<Avatar name={member.name} size="sm" />} title={member.name} meta={member.phone} onClick={() => onPick(member)} />
      ))}
    </List>
  )
}

function PickedMember({ member, onChange }: { member: MemberOption; onChange: () => void }) {
  return (
    <List>
      <ListItem leading={<Avatar name={member.name} size="sm" />} title={member.name} meta={member.phone} trailing={<Button size="sm" onClick={onChange}>Change</Button>} />
    </List>
  )
}
