import { Link } from '@tanstack/react-router'

import { buttonClassName, type Column } from '@/components/shared'
import { formatDay, formatNumber } from '@/lib/format'
import { daysAgoLabel } from '../../shared/utils/filters'
import { groupPlace } from '../utils/group-filters'
import type { GroupTab, ReviewGroup } from '../types'
import { GroupNameCell } from './GroupNameCell'
import { RestoreButton } from './RestoreButton'

type GroupColumn = Column<ReviewGroup>

const name: GroupColumn = { key: 'name', header: 'Group', main: true, cell: (group) => <GroupNameCell group={group} /> }
const category: GroupColumn = { key: 'category', header: 'Category', cell: (group) => group.category }
const place: GroupColumn = { key: 'place', header: 'Location', cell: groupPlace }
const members: GroupColumn = { key: 'members', header: 'Members', numeric: true, cell: (group) => formatNumber(group.memberCount) }
const sent: GroupColumn = { key: 'sent', header: 'Sent', cell: (group) => daysAgoLabel(group.submittedAt) }
const decided: GroupColumn = { key: 'decided', header: 'Date', cell: (group) => (group.decidedAt ? formatDay(group.decidedAt) : '') }
const review: GroupColumn = {
  key: 'review', header: '', numeric: true,
  cell: (group) => <Link to="/admin/groups/$groupId" params={{ groupId: group.id }} className={buttonClassName('secondary', 'sm')}>Review</Link>,
}
const rejectReason: GroupColumn = { key: 'reason', header: 'Reason', cell: (group) => group.rejectionReason ?? '' }
const suspendReason: GroupColumn = { key: 'reason', header: 'Reason', cell: (group) => group.suspendedReason ?? '' }
const restore: GroupColumn = { key: 'restore', header: '', numeric: true, cell: (group) => <RestoreButton groupId={group.id} /> }

/** Which columns each tab shows. */
export const GROUP_COLUMNS: Record<GroupTab, GroupColumn[]> = {
  pending: [name, category, place, members, sent, review],
  verified: [name, category, place, members],
  rejected: [name, rejectReason, decided],
  suspended: [name, suspendReason, decided, restore],
}
