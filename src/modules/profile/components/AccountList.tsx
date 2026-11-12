import { DoorOpen, Trash2 } from 'lucide-react'

import { IconTile, List, ListItem, SectionTitle } from '@/components/shared'

interface AccountListProps {
  isLeader: boolean
  inGroup: boolean
  /** Hide "Delete my details" while a request is already waiting. */
  deletionPending: boolean
  onLeaveGroup: () => void
  onDeleteDetails: () => void
}

/** Leave the group and delete my details. Leaders must hand over first. */
export function AccountList({ isLeader, inGroup, deletionPending, onLeaveGroup, onDeleteDetails }: AccountListProps) {
  return (
    <>
      <SectionTitle title="Your account" />
      {isLeader
        ? <p className="muted small">You lead a group. Hand it over before you leave or delete your details.</p>
        : <MemberActions inGroup={inGroup} deletionPending={deletionPending} onLeaveGroup={onLeaveGroup} onDeleteDetails={onDeleteDetails} />}
    </>
  )
}

function MemberActions({ inGroup, deletionPending, onLeaveGroup, onDeleteDetails }: Omit<AccountListProps, 'isLeader'>) {
  if (!inGroup && deletionPending) return null
  return (
    <List>
      {inGroup && <ListItem title="Leave group" leading={<IconTile icon={DoorOpen} tone="grey" />} onClick={onLeaveGroup} />}
      {!deletionPending && <ListItem title={<span className="red">Delete my details</span>} leading={<IconTile icon={Trash2} tone="red" />} onClick={onDeleteDetails} />}
    </List>
  )
}
