import { createFileRoute } from '@tanstack/react-router'

import { ImportMembersPage } from '@/modules/members/pages/ImportMembersPage'

export const Route = createFileRoute('/_app/members/import')({
  staticData: { title: 'Upload members', backTo: '/members' },
  component: ImportMembersPage,
})
