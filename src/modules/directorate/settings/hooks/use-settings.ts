import { useQuery, useQueryClient } from '@tanstack/react-query'

import { useSettingsMutation } from './use-settings-mutation'
import {
  activityTypesQuery, addActivityType, addCategory, categoriesQuery, decideHandover, handoversQuery,
  removeCategory, renameCategory, setActivityTypeEnabled, staffQuery,
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
  return {
    items: (useQuery(categoriesQuery).data ?? []).filter((category) => category.isActive),
    add: useSettingsMutation(['lists'], withRefresh(addCategory), 'Category added'),
    rename: useSettingsMutation(['lists'], withRefresh(renameCategory), 'Category renamed'),
    remove: useSettingsMutation(['lists'], withRefresh(removeCategory), 'Category removed'),
  }
}

export function useActivityTypes() {
  const withRefresh = useWithLookupRefresh('activity-types')
  return {
    items: useQuery(activityTypesQuery).data ?? [],
    add: useSettingsMutation(['lists'], withRefresh(addActivityType), 'Type added'),
    toggle: useSettingsMutation(['lists'], withRefresh(setActivityTypeEnabled), ({ enabled }) => (enabled ? 'Type turned on' : 'Type turned off')),
  }
}

export function useStaff() {
  return { items: useQuery(staffQuery).data ?? [] }
}

export function useHandovers() {
  const queryClient = useQueryClient()
  const decide = useSettingsMutation(['handovers'], async (args: { id: string; approve: boolean }) => {
    await decideHandover(args)
    await queryClient.invalidateQueries({ queryKey: [...directorateKeys.all, 'dashboard'] })
  }, ({ approve }) => (approve ? 'Handover approved' : 'Handover declined'))
  return { items: useQuery(handoversQuery).data ?? [], decide }
}

/** Staff read the budget; only a super admin can change it. */
export function useSmsBudget() {
  const user = useRequiredUser()
  return {
    budget: useQuery(smsBudgetQuery).data ?? null,
    canEdit: user.title === 'Super admin',
    save: useSettingsMutation(['lists'], (value: number) => setSmsBudget(value), 'SMS budget saved'),
  }
}
