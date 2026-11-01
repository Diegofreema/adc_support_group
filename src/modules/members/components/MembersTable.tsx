import { DataTable, type Column } from '@/components/shared'
import type { MemberRecord } from '../types'
import { JoinedViaChip } from './JoinedViaChip'
import { MemberNameCell } from './MemberNameCell'

interface MembersTableProps {
  members: MemberRecord[]
  onOpen: (member: MemberRecord) => void
}

function buildColumns(onOpen: (member: MemberRecord) => void): Column<MemberRecord>[] {
  return [
    { key: 'name', header: 'Name', main: true, cell: (member) => <MemberNameCell member={member} onOpen={() => onOpen(member)} /> },
    { key: 'ward', header: 'Ward', cell: (member) => member.ward },
    { key: 'chapter', header: 'Chapter', cell: (member) => member.chapterName ?? 'Whole group' },
    { key: 'joined', header: 'Joined by', cell: (member) => <JoinedViaChip joinedVia={member.joinedVia} /> },
  ]
}

export function MembersTable({ members, onOpen }: MembersTableProps) {
  return <DataTable rows={members} columns={buildColumns(onOpen)} rowKey={(member) => member.id} />
}
