export interface Page<T> {
  items: T[]
  page: number
  pageCount: number
  from: number
  to: number
  total: number
}

/** Slice a list into a 1-based page. */
export function paginate<T>(items: T[], page: number, pageSize: number): Page<T> {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const current = Math.min(Math.max(1, page), pageCount)
  const start = (current - 1) * pageSize
  const slice = items.slice(start, start + pageSize)
  return { items: slice, page: current, pageCount, from: slice.length ? start + 1 : 0, to: start + slice.length, total: items.length }
}
