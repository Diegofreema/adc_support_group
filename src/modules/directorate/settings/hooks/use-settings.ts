import { useQuery, useQueryClient } from '@tanstack/react-query'

import { useSettingsMutation } from './use-settings-mutation'
import {
  activityTypesQuery, addActivityType, addCategory, categoriesQuery, decideHandover, givingLimitQuery, handoversQuery,
  removeCategory, renameCategory, setActivityTypeEnabled, setGivingLimit, staffQuery,
} from '../services/settings.service'
import { directorateKeys } from '../../shared/query-keys'
import { setSmsBudget, smsBudgetQuery } from '../../shared/services/admin-settings'
import { useRequiredUser } from '@/stores/session-store'

/** Lists here also feed the filters and pickers on other directorate screens. */
function useWithLookupRefresh(kind: string) {
  const queryClient = useQueryClient()
  return <A>(fn: (args: A) => Promise<void>) => async (args: A) => {
    await fn(args)
    await queryClient.invalidateQueries({ queryKey: directorateKeys.lookups(kind) })
  }
}

export function useCategories() {
  const withRefresh = useWithLookupRefresh('categories')
  const query = useQuery(categoriesQuery)
  return {
    items: (query.data ?? []).filter((category) => category.isActive),
    isLoading: query.isLoading,
    add: useSettingsMutation(['lists'], withRefresh(addCategory), 'Category added'),
    rename: useSettingsMutation(['lists'], withRefresh(renameCategory), 'Category renamed'),
    remove: useSettingsMutation(['lists'], withRefresh(removeCategory), 'Category removed'),
  }
}

export function useActivityTypes() {
  const withRefresh = useWithLookupRefresh('activity-types')
  const query = useQuery(activityTypesQuery)
  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    add: useSettingsMutation(['lists'], withRefresh(addActivityType), 'Type added'),
    toggle: useSettingsMutation(['lists'], withRefresh(setActivityTypeEnabled), ({ enabled }) => (enabled ? 'Type turned on' : 'Type turned off')),
  }
}

export function useStaff() {
  const query = useQuery(staffQuery)
  return { items: query.data ?? [], isLoading: query.isLoading }
}

export function useHandovers() {
  const queryClient = useQueryClient()
  const decide = useSettingsMutation(['handovers'], async (args: { id: string; approve: boolean }) => {
    await decideHandover(args)
    await queryClient.invalidateQueries({ queryKey: [...directorateKeys.all, 'dashboard'] })
  }, ({ approve }) => (approve ? 'Handover approved' : 'Handover declined'))
  const query = useQuery(handoversQuery)
  return { items: query.data ?? [], count: query.data?.length, isLoading: query.isLoading, decide }
}

/** Staff read the budget; only a super admin can change it. */
export function useSmsBudget() {
  const user = useRequiredUser()
  const query = useQuery(smsBudgetQuery)
  return {
    budget: query.data ?? null,
    isLoading: query.isLoading,
    canEdit: user.title === 'Super admin',
    save: useSettingsMutation(['lists'], (value: number) => setSmsBudget(value), 'SMS budget saved'),
  }
}

/** Staff read the yearly giving limit; only a super admin can change it. */
export function useGivingLimit() {
  const user = useRequiredUser()
  const query = useQuery(givingLimitQuery)
  return {
    limit: query.data ?? null,
    isLoading: query.isLoading,
    canEdit: user.title === 'Super admin',
    save: useSettingsMutation(['giving-limit'], setGivingLimit, (limit) => (limit === null ? 'Giving limit removed' : 'Giving limit saved')),
  }
}
