import { createFileRoute } from '@tanstack/react-router'

import { GroupsPage } from '@/modules/directorate/group-review/pages/GroupsPage'

export const Route = createFileRoute('/admin/groups/')({
  staticData: { title: 'Groups' },
  component: GroupsPage,
})
