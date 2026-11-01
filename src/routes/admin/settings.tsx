import { createFileRoute } from '@tanstack/react-router'

import { SettingsPage } from '@/modules/directorate/settings/pages/SettingsPage'

export const Route = createFileRoute('/admin/settings')({
  staticData: { title: 'Settings', backTo: '/admin/more' },
  component: SettingsPage,
})
