import { createFileRoute } from '@tanstack/react-router'

import { requirePower } from '@/lib/route-guards'
import { RecordIncomePage } from '@/modules/money/pages/RecordIncomePage'

export const Route = createFileRoute('/_app/money/income/new')({
  beforeLoad: requirePower('money'),
  staticData: { title: 'Record income', backTo: '/money' },
  component: RecordIncomePage,
})
