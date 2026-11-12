import { Button } from '@/components/shared'

/** Fetches the next page; hidden once everything is loaded. */
export function LoadMoreButton({ hasMore, loading, onClick }: { hasMore: boolean; loading: boolean; onClick: () => void }) {
  if (!hasMore) return null
  return <Button block className="mt-5" disabled={loading} onClick={onClick}>{loading ? 'Loading…' : 'Load more'}</Button>
}
