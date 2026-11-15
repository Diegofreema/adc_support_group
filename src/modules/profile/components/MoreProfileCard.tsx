import { Avatar, List, ListItem } from '@/components/shared'
import { userCaption } from '@/components/layout/user-caption'
import type { User } from '@/types/domain'

/** The user's name and role at the top of the "More" menu. */
export function MoreProfileCard({ user }: { user: User }) {
  return (
    <List>
      <ListItem to="/profile" title={<span className="h3">{user.fullName}</span>} meta={<>{userCaption(user)}<span className="block green small bold mt-0.5">See my profile</span></>} leading={<Avatar name={user.fullName} size="lg" />} />
    </List>
  )
}
