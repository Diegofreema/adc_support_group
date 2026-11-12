import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { MessagesPage } from '@/modules/messages/pages/MessagesPage'

export const Route = createFileRoute('/_app/messages')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Messages' },
  component: MessagesPage,
})
