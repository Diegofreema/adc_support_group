import { createFileRoute } from '@tanstack/react-router'

import { SettingsPage } from '@/modules/directorate/settings/pages/SettingsPage'

const TABS = ['categories', 'types', 'sms', 'giving', 'staff', 'handovers', 'names'] as const

export const Route = createFileRoute('/admin/settings')({
  staticData: { title: 'Settings', backTo: '/admin/more' },
  // ?tab=handovers etc. so the Overview to-do list can open the right tab.
  validateSearch: (search: Record<string, unknown>): { tab?: (typeof TABS)[number] } =>
    TABS.includes(search.tab as (typeof TABS)[number]) ? { tab: search.tab as (typeof TABS)[number] } : {},
  component: SettingsPage,
})
