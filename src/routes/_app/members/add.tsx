import { createFileRoute } from '@tanstack/react-router'

import { AddMembersPage } from '@/modules/members/pages/AddMembersPage'

export const Route = createFileRoute('/_app/members/add')({
  staticData: { title: 'Add members', backTo: '/members' },
  component: AddMembersPage,
})
