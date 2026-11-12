import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { searchMembers } from '../services/dues-status.service'
import { moneyKeys } from '../utils/money-keys'
import { useDebouncedValue } from '@/hooks/use-debounced-value'

/** Search box + matching members, for "who paid". */
export function useMemberSearch() {
  const [search, setSearch] = useState('')
  const settled = useDebouncedValue(search.trim())
  const query = useQuery({ queryKey: moneyKeys.members(settled), queryFn: () => searchMembers(settled), enabled: settled.length >= 2 })
  return { search, setSearch, matches: settled.length >= 2 ? query.data ?? [] : [], isSearching: query.isFetching }
}
