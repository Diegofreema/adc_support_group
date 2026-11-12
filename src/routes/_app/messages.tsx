import { createFileRoute } from '@tanstack/react-router'

import { requirePower } from '@/lib/route-guards'
import { MessagesPage } from '@/modules/messages/pages/MessagesPage'

export const Route = createFileRoute('/_app/messages')({
  beforeLoad: requirePower('messages'),
  staticData: { title: 'Messages' },
  component: MessagesPage,
})
