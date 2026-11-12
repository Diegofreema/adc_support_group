import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { AddMembersPage } from '@/modules/members/pages/AddMembersPage'

export const Route = createFileRoute('/_app/members/add')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Add members', backTo: '/members' },
  component: AddMembersPage,
})
