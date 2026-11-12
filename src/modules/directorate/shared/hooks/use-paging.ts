import { useEffect, useState } from 'react'

/** Rows per page on the Directorate's review lists. */
export const PAGE_SIZE = 50

export interface Paging {
  page: number
  pageSize: number
  offset: number
  setPage: (page: number) => void
}

/** Page state for a server-paged list; any change to `resetKey` (tab, filters, search) goes back to the first page. */
export function usePaging(resetKey: string, pageSize = PAGE_SIZE): Paging {
  const [state, setState] = useState({ key: resetKey, page: 0 })
  const page = state.key === resetKey ? state.page : 0
  return { page, pageSize, offset: page * pageSize, setPage: (next) => setState({ key: resetKey, page: next }) }
}

/** If rows were approved or removed and the page is now past the end, step back to the last page. */
export function useKeepPageInRange(paging: Paging, total: number | undefined) {
  const lastPage = Math.max(0, Math.ceil((total ?? 0) / paging.pageSize) - 1)
  const outOfRange = total !== undefined && paging.page > lastPage
  const { setPage } = paging
  useEffect(() => {
    if (outOfRange) setPage(lastPage)
  }, [outOfRange, lastPage, setPage])
}
