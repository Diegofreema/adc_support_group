import { createFileRoute } from '@tanstack/react-router'

import { requirePower } from '@/lib/route-guards'
import { MembersPage } from '@/modules/members/pages/MembersPage'

export const Route = createFileRoute('/_app/members/')({
  beforeLoad: requirePower('members'),
  staticData: { title: 'Members' },
  component: MembersPage,
})
