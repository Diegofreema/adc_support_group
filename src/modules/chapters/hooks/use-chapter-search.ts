import { useMemo, useState } from 'react'

import { useChapters } from './use-chapters'
import { searchChapters } from '../utils/search'

export function useChapterSearch(groupId: string) {
  const chapters = useChapters(groupId)
  const [search, setSearch] = useState('')
  const results = useMemo(() => searchChapters(chapters.data ?? [], search), [chapters.data, search])
  return { search, setSearch, results, total: chapters.data?.length ?? 0, isLoading: chapters.isLoading }
}
