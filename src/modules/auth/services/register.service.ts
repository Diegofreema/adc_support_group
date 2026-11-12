import { refreshSessionUser } from './session.service'
import { completeSignup } from './verification.service'
import type { RegistrationDraft, RegistrationReceipt } from '../types/auth.types'
import type { RegisterGroupValues } from '../utils/schemas'
import { uploadGroupPhoto } from '@/lib/group-photo'
import { rpc, supabase } from '@/lib/supabase'
import { sessionStore } from '@/stores/session-store'
import type { GroupLevel, GroupStatus } from '@/types/domain'

async function categoryId(name: string): Promise<string> {
  const { data, error } = await supabase.from('support_group_categories').select('id').eq('name', name).maybeSingle()
  if (error) throw new Error(error.message)
  if (!data) throw new Error('Pick a category')
  return data.id as string
}

const blank = (value: string) => value.trim() || null

export interface RegisterInput {
  values: RegisterGroupValues
  challengeId: string | null
  /** New photo picked in the leader step. */
  photo: File | null
  /** Editing: the photo already on the group (register_support_group would clear it otherwise). */
  existingPhotoUrl?: string
}

/**
 * Create the leader's account (unless they're already signed in), then submit
 * the group for Directorate checks. The same call edits a pending group in
 * place and resubmits a rejected one. The leader stays signed in.
 */
export async function registerGroup({ values, challengeId, photo, existingPhotoUrl }: RegisterInput): Promise<RegistrationReceipt> {
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
  const group = await rpc<{ id: string; name: string; submitted_at: string }>('register_support_group', {
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
    p_photo_url: existingPhotoUrl ?? null,
  })

  // The group is in either way; a failed photo upload is reported, not fatal.
  const photoFailed = photo ? await uploadGroupPhoto(group.id, photo).then(() => false, () => true) : false
  await refreshSessionUser()
  return { groupName: group.name, submittedAt: group.submitted_at, photoFailed }
}

/** support_group_json fields the edit form needs (from get_my_support_group_review). */
interface DraftRow {
  name: string
  status: GroupStatus
  category: string | null
  level: GroupLevel | null
  state: string | null
  lga: string | null
  ward: string | null
  country: string | null
  city: string | null
  about: string | null
  photo_url: string | null
  cac_number: string | null
  leader_title: string | null
}

/** The leader's pending or rejected group, as form values for "Edit details". */
export async function fetchRegistrationDraft(): Promise<RegistrationDraft> {
  const row = await rpc<DraftRow>('get_my_support_group_review')
  if (row.status !== 'pending' && row.status !== 'rejected') throw new Error('This group can no longer be edited')
  const level = row.level
  const abroad = level === 'abroad'
  return {
    status: row.status,
    photoUrl: row.photo_url ?? undefined,
    values: {
      groupName: row.name,
      category: row.category ?? '',
      about: row.about ?? '',
      location: abroad ? 'abroad' : 'nigeria',
      level: level === 'abroad' || !level ? 'national' : level,
      state: row.state ?? '',
      lga: row.lga ?? '',
      ward: row.ward ?? '',
      country: row.country ?? '',
      city: row.city ?? '',
      leaderTitle: row.leader_title ?? '',
      cacNumber: row.cac_number ?? '',
    },
  }
}
