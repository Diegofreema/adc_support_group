import { createFileRoute } from '@tanstack/react-router'

import { BroadcastsPage } from '@/modules/directorate/broadcasts/pages/BroadcastsPage'

export const Route = createFileRoute('/admin/messages')({
  staticData: { title: 'Messages', backTo: '/admin/more' },
  component: BroadcastsPage,
})
