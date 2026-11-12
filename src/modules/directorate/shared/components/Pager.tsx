import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { Paging } from '../hooks/use-paging'

/** "51–100 of 230" with previous / next; hidden when everything fits on one page. */
export function Pager({ paging, total }: { paging: Paging; total: number }) {
  if (total <= paging.pageSize) return null
  const from = paging.offset + 1
  const to = Math.min(paging.offset + paging.pageSize, total)
  return (
    <div className="row-between mt-4 small muted">
      <span>{formatNumber(from)}–{formatNumber(to)} of {formatNumber(total)}</span>
      <div className="row !gap-1.5">
        <Button size="sm" icon={ChevronLeft} aria-label="Previous page" disabled={paging.page === 0} onClick={() => paging.setPage(paging.page - 1)} />
        <Button size="sm" icon={ChevronRight} aria-label="Next page" disabled={to >= total} onClick={() => paging.setPage(paging.page + 1)} />
      </div>
    </div>
  )
}
