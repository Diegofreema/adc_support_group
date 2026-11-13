import { refreshSessionUser } from '@/modules/auth'
import { rpc } from '@/lib/supabase'
import type { VotingArea } from '../types'

/**
 * Save where I vote. Only the unit code goes up: the server checks it is on
 * the INEC list and fills in the state, LGA, ward and name from that list.
 */
export async function saveVotingArea(pollingUnitCode: string): Promise<VotingArea> {
  const area = await rpc<VotingArea>('set_my_voting_area', { p_polling_unit_code: pollingUnitCode })
  await refreshSessionUser()
  return area
}
