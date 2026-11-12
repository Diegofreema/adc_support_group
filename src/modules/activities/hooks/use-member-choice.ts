import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { searchMembers } from '../services/activities.service'
import { activityKeys } from './use-activities'
import type { MemberOption } from '../types'

export type WhoMode = 'me' | 'member'

const SEARCH_DELAY_MS = 350

/** The search text, once typing pauses (saves data on slow phones). */
function useSettledText(text: string): string {
  const [settled, setSettled] = useState(text)
  useEffect(() => {
    const timer = setTimeout(() => setSettled(text.trim()), SEARCH_DELAY_MS)
    return () => clearTimeout(timer)
  }, [text])
  return settled
}

function useMemberSearch(search: string, enabled: boolean) {
  const term = useSettledText(search)
  return useQuery({
    queryKey: [...activityKeys.all, 'members', term],
    queryFn: () => searchMembers(term),
    enabled,
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  })
}

/** "Who did this?": yourself, or a member you pick from the roster. */
export function useMemberChoice() {
  const [mode, setMode] = useState<WhoMode>('me')
  const [member, setMember] = useState<MemberOption>()
  const [search, setSearch] = useState('')
  const [missing, setMissing] = useState(false)
  const results = useMemberSearch(search, mode === 'member' && !member)

  const pick = (option: MemberOption | undefined) => { setMember(option); setMissing(false) }
  const changeMode = (next: WhoMode) => { setMode(next); setMissing(false) }

  /** False (and shows the error) when "A member" is chosen but none picked. */
  const validate = () => {
    const ok = mode === 'me' || Boolean(member)
    setMissing(!ok)
    return ok
  }

  return {
    mode, setMode: changeMode, member, pick, search, setSearch, validate,
    results: results.data ?? [],
    isSearching: results.isFetching,
    error: missing ? 'Pick the member' : undefined,
    forProfileId: mode === 'member' ? member?.id : undefined,
  }
}

export type MemberChoice = ReturnType<typeof useMemberChoice>
