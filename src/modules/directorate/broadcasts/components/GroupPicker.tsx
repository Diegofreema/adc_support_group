import { X } from 'lucide-react'
import { useState } from 'react'

import { GroupMark, IconButton, List, ListItem, SearchInput } from '@/components/shared'
import { useGroupSearch } from '../hooks/use-broadcast-reach'
import type { PickedGroup } from '../types'

interface GroupPickerProps {
  value: PickedGroup | null
  onChange: (group: PickedGroup | null) => void
}

/** Type a name → pick one verified group; the picked group shows with a "×" to clear it. */
export function GroupPicker({ value, onChange }: GroupPickerProps) {
  if (value) return <PickedGroupRow group={value} onClear={() => onChange(null)} />
  return <GroupSearch onPick={onChange} />
}

function PickedGroupRow({ group, onClear }: { group: PickedGroup; onClear: () => void }) {
  return (
    <List>
      <ListItem leading={<GroupMark name={group.name} />} title={group.name} meta={group.place} trailing={<IconButton icon={X} label={`Remove ${group.name}`} onClick={onClear} />} />
    </List>
  )
}

function GroupSearch({ onPick }: { onPick: (group: PickedGroup) => void }) {
  const [search, setSearch] = useState('')
  const { matches, searching, enabled } = useGroupSearch(search)
  return (
    <>
      <SearchInput value={search} onChange={setSearch} placeholder="Search verified groups" />
      {enabled && <GroupMatches matches={matches} searching={searching} onPick={onPick} />}
    </>
  )
}

function GroupMatches({ matches, searching, onPick }: { matches: PickedGroup[]; searching: boolean; onPick: (group: PickedGroup) => void }) {
  if (!matches.length) return <p className="small faint mt-2" aria-live="polite">{searching ? 'Searching…' : 'No verified group matches'}</p>
  return (
    <List className="mt-2">
      {matches.map((group) => <ListItem key={group.id} leading={<GroupMark name={group.name} />} title={group.name} meta={group.place} onClick={() => onPick(group)} />)}
    </List>
  )
}
