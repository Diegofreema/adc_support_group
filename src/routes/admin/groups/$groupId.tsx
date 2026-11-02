import { createFileRoute } from '@tanstack/react-router'

import { GroupReviewPage } from '@/modules/directorate/group-review/pages/GroupReviewPage'

export const Route = createFileRoute('/admin/groups/$groupId')({
  staticData: { title: 'Review group', backTo: '/admin/groups' },
  component: GroupReviewPage,
})
