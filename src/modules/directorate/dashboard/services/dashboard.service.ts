import { queryOptions } from '@tanstack/react-query'

import { DASHBOARD, PERIOD_FACTOR } from './dashboard.mock'
import { directorateKeys } from '../../shared/query-keys'
import type { Dashboard, Period, StateRow } from '../types'
import { respond } from '@/lib/mock-api'

function scaleRow(row: StateRow, factor: number): StateRow {
  return { ...row, activities: Math.round(row.activities * factor), raised: Math.round(row.raised * factor) }
}

/** Mock: one dashboard endpoint, scaled by period. */
async function fetchDashboard(period: Period): Promise<Dashboard> {
  const factor = PERIOD_FACTOR[period]
  return respond({ ...DASHBOARD, states: DASHBOARD.states.map((row) => scaleRow(row, factor)) })
}

export const dashboardQuery = (period: Period) =>
  queryOptions({ queryKey: directorateKeys.dashboard(period), queryFn: () => fetchDashboard(period) })
