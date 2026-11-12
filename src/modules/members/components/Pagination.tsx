import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { Page } from '../utils/paginate'

interface PaginationProps<T> {
  page: Page<T>
  onPage: (page: number) => void
  /** Rows shown above the server's (the leader, on page 1), counted in the totals. */
  pinned?: number
}

/** "1–8 of 12" with previous / next. */
export function Pagination<T>({ page, onPage, pinned = 0 }: PaginationProps<T>) {
  const from = page.page === 1 ? (page.to + pinned > 0 ? 1 : 0) : page.from + pinned
  return (
    <div className="row-between mt-4 small muted">
      <span>{from}–{page.to + pinned} of {formatNumber(page.total + pinned)}</span>
      <div className="row !gap-1.5">
        <Button size="sm" icon={ChevronLeft} aria-label="Previous page" disabled={page.page <= 1} onClick={() => onPage(page.page - 1)} />
        <Button size="sm" icon={ChevronRight} aria-label="Next page" disabled={page.page >= page.pageCount} onClick={() => onPage(page.page + 1)} />
      </div>
    </div>
  )
}
