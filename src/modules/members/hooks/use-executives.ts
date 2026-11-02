import { useMemo } from 'react'

import { useMembers } from './use-members'
import { selectExecutives } from '../utils/filters'

export function useExecutives(groupId: string) {
  const members = useMembers(groupId)
  const executives = useMemo(() => selectExecutives(members.data ?? []), [members.data])
  return { executives, isLoading: members.isLoading }
}
