import { queryOptions } from '@tanstack/react-query'

import { ACTIVITY_TYPES, CATEGORIES, HANDOVERS, STAFF } from './settings.mock'
import { directorateKeys } from '../../shared/query-keys'
import type { ActivityType, Category, Handover, StaffMember } from '../types'
import { newId, notFound, respond } from '@/lib/mock-api'

let categories: Category[] = structuredClone(CATEGORIES)
const activityTypes: ActivityType[] = structuredClone(ACTIVITY_TYPES)
let staff: StaffMember[] = structuredClone(STAFF)
let handovers: Handover[] = structuredClone(HANDOVERS)

function findById<T extends { id: string }>(items: T[], id: string, entity: string): T {
  return items.find((item) => item.id === id) ?? notFound(entity, id)
}

export const categoriesQuery = queryOptions({ queryKey: directorateKeys.settings('categories'), queryFn: () => respond(categories) })
export const activityTypesQuery = queryOptions({ queryKey: directorateKeys.settings('types'), queryFn: () => respond(activityTypes) })
export const staffQuery = queryOptions({ queryKey: directorateKeys.settings('staff'), queryFn: () => respond(staff) })
export const handoversQuery = queryOptions({ queryKey: directorateKeys.settings('handovers'), queryFn: () => respond(handovers) })

export async function addCategory(name: string) {
  categories.push({ id: newId('cat'), name, groupCount: 0 })
  return respond(categories)
}

export async function renameCategory({ id, name }: { id: string; name: string }) {
  findById(categories, id, 'Category').name = name
  return respond(categories)
}

export async function removeCategory(id: string) {
  categories = categories.filter((category) => category.id !== id)
  return respond(categories)
}

export async function addActivityType(name: string) {
  activityTypes.push({ id: newId('typ'), name, enabled: true })
  return respond(activityTypes)
}

export async function setActivityTypeEnabled({ id, enabled }: { id: string; enabled: boolean }) {
  findById(activityTypes, id, 'Activity type').enabled = enabled
  return respond(activityTypes)
}

export async function addStaff(input: { fullName: string; contact: string }) {
  staff.push({ id: newId('stf'), ...input, role: 'staff' })
  return respond(staff)
}

export async function removeStaff(id: string) {
  staff = staff.filter((member) => member.id !== id || member.role === 'super-admin')
  return respond(staff)
}

/** Approve or decline a leadership handover; either way it leaves the queue. */
export async function decideHandover({ id }: { id: string; approve: boolean }) {
  handovers = handovers.filter((handover) => handover.id !== id)
  return respond(handovers)
}
