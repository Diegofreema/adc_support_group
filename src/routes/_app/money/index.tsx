import { createFileRoute } from '@tanstack/react-router'

import { requireVerifiedGroup } from '@/lib/route-guards'
import { MoneyPage } from '@/modules/money/pages/MoneyPage'

export const Route = createFileRoute('/_app/money/')({
  beforeLoad: requireVerifiedGroup,
  staticData: { title: 'Group money' },
  component: MoneyPage,
})
