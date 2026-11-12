import { createFileRoute } from '@tanstack/react-router'

import { requireGroup } from '@/lib/route-guards'
import { GroupPage } from '@/modules/groups/pages/GroupPage'

export const Route = createFileRoute('/_app/group')({
  beforeLoad: requireGroup,
  staticData: { title: 'My group' },
  component: GroupPage,
})
