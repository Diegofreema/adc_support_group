export interface Page<T> {
  total: number
  rows: T[]
}

/** Read every page of an admin list RPC ({ total, rows }), up to `max` rows. */
export async function fetchAllPages<T>(fetchPage: (limit: number, offset: number) => Promise<Page<T>>, pageSize: number, max = 20_000): Promise<T[]> {
  const rows: T[] = []
  for (let offset = 0; offset < max; offset += pageSize) {
    const page = await fetchPage(pageSize, offset)
    rows.push(...page.rows)
    if (rows.length >= Number(page.total) || page.rows.length < pageSize) break
  }
  return rows
}
