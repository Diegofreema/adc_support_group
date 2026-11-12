import { createFileRoute } from '@tanstack/react-router'

import { requirePower } from '@/lib/route-guards'
import { DuesSettingsPage } from '@/modules/money/pages/DuesSettingsPage'

export const Route = createFileRoute('/_app/money/dues-settings')({
  beforeLoad: requirePower('money'),
  staticData: { title: 'Dues settings', backTo: '/money' },
  component: DuesSettingsPage,
})
