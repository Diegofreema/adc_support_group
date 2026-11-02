import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface ListItemProps {
  title: ReactNode
  meta?: ReactNode
  /** Left slot: IconTile, Avatar or GroupMark. */
  leading?: ReactNode
  /** Right slot: chip, amount, button. */
  trailing?: ReactNode
  /** Makes the row a link. */
  to?: string
  params?: Record<string, string>
  onClick?: () => void
  /** Extra content under the title (e.g. a reason box). */
  children?: ReactNode
}

/** One ruled row. Becomes a link or button when given `to` or `onClick`. */
export function ListItem({ title, meta, leading, trailing, to, params, onClick, children }: ListItemProps) {
  const body = <ListItemBody title={title} meta={meta} leading={leading} trailing={trailing} showChevron={Boolean(to || onClick)}>{children}</ListItemBody>
  if (to) return <Link className="list-item" to={to} params={params}>{body}</Link>
  if (onClick) return <button type="button" className="list-item w-full text-left" onClick={onClick}>{body}</button>
  return <div className="list-item">{body}</div>
}

interface ListItemBodyProps extends Pick<ListItemProps, 'title' | 'meta' | 'leading' | 'trailing' | 'children'> {
  showChevron: boolean
}

function ListItemBody({ title, meta, leading, trailing, showChevron, children }: ListItemBodyProps) {
  return (
    <>
      {leading}
      <span className="grow">
        <span className="title truncate block">{title}</span>
        {meta && <span className="meta block">{meta}</span>}
        {children}
      </span>
      {trailing}
      {showChevron && !trailing && <ChevronRight className="i chev" aria-hidden />}
    </>
  )
}
