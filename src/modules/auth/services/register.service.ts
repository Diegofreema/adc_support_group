import { refreshSessionUser } from './session.service'
import { completeSignup } from './verification.service'
import type { RegistrationReceipt } from '../types/auth.types'
import type { RegisterGroupValues } from '../utils/schemas'
import { rpc, supabase } from '@/lib/supabase'
import { sessionStore } from '@/stores/session-store'

async function categoryId(name: string): Promise<string> {
  const { data, error } = await supabase.from('support_group_categories').select('id').eq('name', name).maybeSingle()
  if (error) throw new Error(error.message)
  if (!data) throw new Error('Pick a category')
  return data.id as string
}

const blank = (value: string) => value.trim() || null

/**
 * Create the leader's account (unless they're already signed in), then submit
 * the group for Directorate checks. The leader stays signed in.
 */
export async function registerGroup(values: RegisterGroupValues, challengeId: string | null): Promise<RegistrationReceipt> {
  if (!sessionStore.getUser()) {
    if (!challengeId) throw new Error('Send yourself a code first')
    await completeSignup({
      challengeId,
      code: values.code,
      fullName: values.fullName,
      phone: values.phone,
      password: values.password,
      state: values.location === 'nigeria' ? values.state : undefined,
      lga: values.location === 'nigeria' ? values.lga : undefined,
      ward: values.location === 'nigeria' ? values.ward : undefined,
    })
  }

  const abroad = values.location === 'abroad'
  const group = await rpc<{ name: string; submitted_at: string }>('register_support_group', {
    p_name: values.groupName,
    p_category_id: await categoryId(values.category),
    p_level: abroad ? 'abroad' : values.level,
    p_leader_title: values.leaderTitle,
    p_state: abroad ? null : blank(values.state),
    p_lga: abroad ? null : blank(values.lga),
    p_ward: abroad ? null : blank(values.ward),
    p_country: abroad ? blank(values.country) : null,
    p_city: abroad ? blank(values.city) : null,
    p_about: blank(values.about),
    p_cac_number: blank(values.cacNumber),
  })
  await refreshSessionUser()
  return { groupName: group.name, submittedAt: group.submitted_at }
}
