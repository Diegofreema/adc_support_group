import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { ImportMembersPage } from '@/modules/members/pages/ImportMembersPage'

export const Route = createFileRoute('/_app/members/import')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Upload members', backTo: '/members' },
  component: ImportMembersPage,
})
