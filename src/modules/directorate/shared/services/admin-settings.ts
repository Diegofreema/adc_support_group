import { queryOptions } from '@tanstack/react-query'

import { directorateKeys } from '../query-keys'
import { rpc } from '@/lib/supabase'

/** get_admin_sg_settings: lists for Settings plus the SMS budget. */
export interface AdminSettingsJson {
  categories: { id: string; name: string; is_active: boolean; sort: number; group_count: number }[]
  activity_types: { id: string; slug: string; name: string; is_enabled: boolean; sort: number }[]
  sms?: { monthly_budget: number; used_this_month: number; left: number }
}

export interface SmsBudget {
  monthlyBudget: number
  usedThisMonth: number
  left: number
}

export const fetchAdminSettings = () => rpc<AdminSettingsJson>('get_admin_sg_settings')

/** One RPC; each screen selects its part. */
export const adminSettingsQuery = queryOptions({ queryKey: directorateKeys.settings('lists'), queryFn: fetchAdminSettings })

export const smsBudgetQuery = queryOptions({
  ...adminSettingsQuery,
  select: (data: AdminSettingsJson): SmsBudget | null => data.sms
    ? { monthlyBudget: Number(data.sms.monthly_budget), usedThisMonth: Number(data.sms.used_this_month), left: Number(data.sms.left) }
    : null,
})

/** Super admin only (the RPC refuses everyone else). */
export async function setSmsBudget(monthlyBudget: number): Promise<void> {
  await rpc('set_support_group_sms_budget', { p_monthly_budget: monthlyBudget })
}
