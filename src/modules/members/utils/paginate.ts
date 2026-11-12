export interface Page<T> {
  items: T[]
  page: number
  pageCount: number
  from: number
  to: number
  total: number
}

/** A 1-based page of a list the server paged: `items` is this page, `total` the whole match. */
export function serverPage<T>(items: T[], total: number, page: number, pageSize: number): Page<T> {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize
  return { items, page, pageCount, from: items.length ? start + 1 : 0, to: start + items.length, total }
}
