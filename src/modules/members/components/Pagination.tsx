import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/shared'
import { formatNumber } from '@/lib/format'
import type { Page } from '../utils/paginate'

/** "1–8 of 12" with previous / next. */
export function Pagination<T>({ page, onPage }: { page: Page<T>; onPage: (page: number) => void }) {
  return (
    <div className="row-between mt-4 small muted">
      <span>{page.from}–{page.to} of {formatNumber(page.total)}</span>
      <div className="row !gap-1.5">
        <Button size="sm" icon={ChevronLeft} aria-label="Previous page" disabled={page.page <= 1} onClick={() => onPage(page.page - 1)} />
        <Button size="sm" icon={ChevronRight} aria-label="Next page" disabled={page.page >= page.pageCount} onClick={() => onPage(page.page + 1)} />
      </div>
    </div>
  )
}
