import { useQuery } from '@tanstack/react-query'

import { useSettingsMutation } from './use-settings-mutation'
import {
  activityTypesQuery, addActivityType, addCategory, addStaff, categoriesQuery, decideHandover, handoversQuery,
  removeCategory, removeStaff, renameCategory, setActivityTypeEnabled, staffQuery,
} from '../services/settings.service'

export function useCategories() {
  return {
    items: useQuery(categoriesQuery).data ?? [],
    add: useSettingsMutation('categories', addCategory, 'Category added'),
    rename: useSettingsMutation('categories', renameCategory, 'Category renamed'),
    remove: useSettingsMutation('categories', removeCategory, 'Category removed'),
  }
}

export function useActivityTypes() {
  return {
    items: useQuery(activityTypesQuery).data ?? [],
    add: useSettingsMutation('types', addActivityType, 'Type added'),
    toggle: useSettingsMutation('types', setActivityTypeEnabled, ({ enabled }) => (enabled ? 'Type turned on' : 'Type turned off')),
  }
}

export function useStaff() {
  return {
    items: useQuery(staffQuery).data ?? [],
    add: useSettingsMutation('staff', addStaff, 'Staff added'),
    remove: useSettingsMutation('staff', removeStaff, 'Staff removed'),
  }
}

export function useHandovers() {
  return {
    items: useQuery(handoversQuery).data ?? [],
    decide: useSettingsMutation('handovers', decideHandover, ({ approve }) => (approve ? 'Handover approved' : 'Handover declined')),
  }
}
