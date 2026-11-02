import { createFileRoute } from '@tanstack/react-router'

import { NotificationsPage } from '@/modules/notifications/pages/NotificationsPage'

export const Route = createFileRoute('/_app/notifications')({
  staticData: { title: 'Alerts' },
  component: NotificationsPage,
})
