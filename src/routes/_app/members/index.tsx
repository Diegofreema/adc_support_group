import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { MembersPage } from '@/modules/members/pages/MembersPage'

export const Route = createFileRoute('/_app/members/')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Members' },
  component: MembersPage,
})
