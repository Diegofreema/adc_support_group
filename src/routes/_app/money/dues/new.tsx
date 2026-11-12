import { createFileRoute } from '@tanstack/react-router'

import { requirePower } from '@/lib/route-guards'
import { RecordDuesPage } from '@/modules/money/pages/RecordDuesPage'

interface RecordDuesSearch {
  /** Prefill from "Who hasn't paid": member id, their name, and the period shown. */
  member?: string
  name?: string
  period?: string
}

const text = (value: unknown) => (typeof value === 'string' && value ? value : undefined)
const day = (value: unknown) => (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined)

export const Route = createFileRoute('/_app/money/dues/new')({
  validateSearch: (search: Record<string, unknown>): RecordDuesSearch => ({ member: text(search.member), name: text(search.name), period: day(search.period) }),
  beforeLoad: requirePower('money'),
  staticData: { title: 'Record dues', backTo: '/money' },
  component: RecordDuesPage,
})
