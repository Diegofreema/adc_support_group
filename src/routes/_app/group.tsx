import { createFileRoute } from '@tanstack/react-router'

import { GroupPage } from '@/modules/groups/pages/GroupPage'

export const Route = createFileRoute('/_app/group')({
  staticData: { title: 'My group' },
  component: GroupPage,
})
