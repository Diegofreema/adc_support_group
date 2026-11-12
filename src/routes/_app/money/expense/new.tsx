import { createFileRoute } from '@tanstack/react-router'

import { requirePower } from '@/lib/route-guards'
import { RecordExpensePage } from '@/modules/money/pages/RecordExpensePage'

export const Route = createFileRoute('/_app/money/expense/new')({
  beforeLoad: requirePower('money'),
  staticData: { title: 'Record expense', backTo: '/money' },
  component: RecordExpensePage,
})
