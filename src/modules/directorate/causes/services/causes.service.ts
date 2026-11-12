import { queryOptions } from '@tanstack/react-query'

import { directorateKeys } from '../../shared/query-keys'
import { visibilityLabel } from '../utils/visibility'
import type { CauseInput, DirectorateCause } from '../types'
import { rpc } from '@/lib/supabase'
import type { CauseStatus } from '@/types/domain'

/** get_admin_sg_causes row. */
interface CauseJson {
  id: string
  title: string
  description: string | null
  target: number | string
  raised: number | string
  groups_count: number
  deadline: string | null
  status: CauseStatus
  visible_category_ids: string[] | null
  visible_categories: string[] | null
  visible_states: string[] | null
}

function toCause(json: CauseJson): DirectorateCause {
  const visibleStates = json.visible_states ?? []
  return {
    id: json.id,
    title: json.title,
    description: json.description ?? undefined,
    target: Number(json.target),
    raised: Number(json.raised),
    deadline: json.deadline ?? '',
    groupsCount: Number(json.groups_count),
    status: json.status,
    visibleTo: visibilityLabel(visibleStates, json.visible_categories ?? []),
    visibleStates,
    visibleCategoryIds: json.visible_category_ids ?? [],
  }
}

async function fetchCauses(): Promise<DirectorateCause[]> {
  return (await rpc<CauseJson[]>('get_admin_sg_causes', { p_status: null })).map(toCause)
}

export const causesQuery = queryOptions({ queryKey: directorateKeys.causes(), queryFn: fetchCauses })

/** Create (no id) or update a cause; returns its id. */
export function saveCause(id: string | undefined, input: CauseInput): Promise<string> {
  return rpc<string>('save_support_group_cause', {
    p_cause_id: id ?? null,
    p_title: input.title,
    p_target_amount: input.target,
    p_description: input.description ?? null,
    p_deadline: input.deadline || null,
    p_visible_category_ids: input.visibleCategoryIds,
    p_visible_states: input.visibleStates,
  })
}

export async function setCauseStatus(id: string, status: CauseStatus): Promise<void> {
  await rpc('set_support_group_cause_status', { p_cause_id: id, p_status: status })
}
