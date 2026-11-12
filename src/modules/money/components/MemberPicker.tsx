import { Avatar, Button, Card, Field, List, ListItem, SearchInput } from '@/components/shared'
import { useMemberSearch } from '../hooks/use-member-search'
import type { MemberOption } from '../types'

interface MemberPickerProps {
  label: string
  value: Pick<MemberOption, 'id' | 'name'> | null
  onChange: (member: Pick<MemberOption, 'id' | 'name'> | null) => void
  error?: string
  optional?: boolean
}

/** Search by name or phone, tap a name. Once picked, shows the name with "Change". */
export function MemberPicker({ label, value, onChange, error, optional }: MemberPickerProps) {
  return (
    <Field label={label} error={error} optional={optional}>
      {value ? <Picked name={value.name} onClear={() => onChange(null)} /> : <MemberSearch onPick={onChange} />}
    </Field>
  )
}

function Picked({ name, onClear }: { name: string; onClear: () => void }) {
  return (
    <Card className="row-between">
      <span className="row gap-3"><Avatar name={name} size="sm" /><span className="bold">{name}</span></span>
      <Button size="sm" variant="ghost" onClick={onClear}>Change</Button>
    </Card>
  )
}

function MemberSearch({ onPick }: { onPick: (member: MemberOption) => void }) {
  const { search, setSearch, matches, isSearching } = useMemberSearch()
  const typed = search.trim().length >= 2
  return (
    <div className="stack">
      <SearchInput value={search} onChange={setSearch} placeholder="Name or phone" />
      {matches.length > 0 && (
        <List>{matches.map((member) => <ListItem key={member.id} onClick={() => onPick(member)} leading={<Avatar name={member.name} size="sm" />} title={member.name} meta={member.phone} />)}</List>
      )}
      {typed && !isSearching && matches.length === 0 && <p className="small faint">No member found</p>}
    </div>
  )
}
