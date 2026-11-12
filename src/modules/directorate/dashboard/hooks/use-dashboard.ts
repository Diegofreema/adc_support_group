import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { dashboardQuery } from '../services/dashboard.service'
import type { Period } from '../types'

/** Dashboard data for the selected period. */
export function useDashboard() {
  const [period, setPeriod] = useState<Period>('all')
  const query = useQuery({ ...dashboardQuery(period), placeholderData: keepPreviousData })
  return { period, setPeriod, dashboard: query.data, isLoading: query.isLoading, error: query.error }
}
