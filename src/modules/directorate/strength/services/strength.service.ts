import { rpc } from '@/lib/supabase'
import type { Strength, StrengthPoint, StrengthScope } from '../types'

/** The breakdown for an area; a state admin always gets their own state. */
export function fetchStrength(scope: StrengthScope): Promise<Strength> {
  return rpc<Strength>('get_admin_sg_strength', {
    p_state: scope.state ?? null,
    p_lga: scope.lga ?? null,
    p_ward: scope.ward ?? null,
  })
}

/** Members per unit in one state, for the map. */
export function fetchStrengthPoints(state: string): Promise<StrengthPoint[]> {
  return rpc<StrengthPoint[]>('get_admin_sg_strength_points', { p_state: state })
}
