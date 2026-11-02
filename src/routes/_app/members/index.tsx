import { createFileRoute } from '@tanstack/react-router'

import { MembersPage } from '@/modules/members/pages/MembersPage'

export const Route = createFileRoute('/_app/members/')({
  staticData: { title: 'Members' },
  component: MembersPage,
})
