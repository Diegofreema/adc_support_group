import { createFileRoute } from '@tanstack/react-router'

import { MessagesPage } from '@/modules/messages/pages/MessagesPage'

export const Route = createFileRoute('/_app/messages')({
  staticData: { title: 'Messages' },
  component: MessagesPage,
})
