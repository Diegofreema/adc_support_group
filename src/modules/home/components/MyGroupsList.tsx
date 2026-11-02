import { GroupMark, List, ListItem, SectionTitle } from '@/components/shared'
import type { MyGroup } from '../types/home.types'
import { groupRoleLine } from '../utils/roles'

/** Groups the user belongs to, with their role. */
export function MyGroupsList({ groups, title = 'My groups' }: { groups: MyGroup[]; title?: string }) {
  return (
    <>
      <SectionTitle title={title} />
      <List>
        {groups.map((group) => (
          <ListItem key={group.id} to="/group" title={group.name} meta={groupRoleLine(group.role, group.chapterName)} leading={<GroupMark name={group.name} />} />
        ))}
      </List>
    </>
  )
}
