import { createFileRoute } from '@tanstack/react-router'

import { requirePower } from '@/lib/route-guards'
import { DuesStatusPage } from '@/modules/money/pages/DuesStatusPage'

export const Route = createFileRoute('/_app/money/dues-status')({
  beforeLoad: requirePower('money'),
  staticData: { title: 'Dues paid', backTo: '/money' },
  component: DuesStatusPage,
})
