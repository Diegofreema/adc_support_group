import { queryOptions } from '@tanstack/react-query'

import { NO_CATEGORY } from '../../shared/constants/options'
import { directorateKeys } from '../../shared/query-keys'
import type { Dashboard, Period } from '../types'
import { rpc } from '@/lib/supabase'

type Num = number | string

/** get_admin_sg_overview (state admins only see their own state). */
interface OverviewJson {
  totals: {
    verified_groups: Num
    waiting_groups: Num
    supporters: Num
    activities: Num
    activities_this_week: Num
    raised: Num
    raised_offline: Num
  }
  todo: { groups_to_verify: Num; activities_to_check: Num; offline_to_confirm: Num; handovers: Num }
  states: { state: string; groups: Num; members: Num; activities: Num; raised: Num }[]
  top_groups: { id: string; name: string; activities: Num; members: Num; money: Num }[]
  categories: { label: string; value: Num }[]
}

/** The RPC labels groups with no category 'Uncategorised'; the app says NO_CATEGORY everywhere. */
const categoryLabel = (label: string) => (label === 'Uncategorised' ? NO_CATEGORY : label)

function toDashboard(json: OverviewJson): Dashboard {
  const { totals, todo } = json
  return {
    totals: {
      verifiedGroups: Number(totals.verified_groups),
      waitingGroups: Number(totals.waiting_groups),
      supporters: Number(totals.supporters),
      activities: Number(totals.activities),
      activitiesThisWeek: Number(totals.activities_this_week),
      raised: Number(totals.raised),
      raisedOffline: Number(totals.raised_offline),
    },
    todo: {
      groupsToVerify: Number(todo.groups_to_verify),
      activitiesToCheck: Number(todo.activities_to_check),
      offlineToConfirm: Number(todo.offline_to_confirm),
      handovers: Number(todo.handovers),
    },
    states: json.states.map((row) => ({
      state: row.state, groups: Number(row.groups), members: Number(row.members), activities: Number(row.activities), raised: Number(row.raised),
    })),
    topGroups: json.top_groups.map((row) => ({
      id: row.id, name: row.name, activities: Number(row.activities), members: Number(row.members), money: Number(row.money),
    })),
    categories: json.categories.map((row) => ({ label: categoryLabel(row.label), value: Number(row.value) })),
  }
}

async function fetchDashboard(period: Period): Promise<Dashboard> {
  return toDashboard(await rpc<OverviewJson>('get_admin_sg_overview', { p_period: period }))
}

export const dashboardQuery = (period: Period) =>
  queryOptions({ queryKey: directorateKeys.dashboard(period), queryFn: () => fetchDashboard(period) })
