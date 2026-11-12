import { Card, CardHead, ErrorState, Skeleton, SkeletonRegion } from '@/components/shared'
import { formatDateTime } from '@/lib/format'
import { Pager } from '../../shared/components/Pager'
import { useGroupHistory } from '../hooks/use-group-history'
import { auditLine, shortWhen } from '../utils/audit-lines'
import type { GroupAuditEntry } from '../types'

function AuditRow({ entry }: { entry: GroupAuditEntry }) {
  return (
    <li className="row-between items-start gap-3 border-b border-line py-2 last:border-b-0">
      <span className="small">{auditLine(entry)}</span>
      <time className="tiny faint shrink-0" dateTime={entry.at} title={formatDateTime(entry.at)}>{shortWhen(entry.at)}</time>
    </li>
  )
}

/** Audit-row placeholders while the first page loads. */
function AuditSkeleton() {
  return (
    <SkeletonRegion label="Loading the history">
      <ul aria-hidden>
        {[70, 55, 62, 48].map((width) => (
          <li key={width} className="row-between items-center gap-3 border-b border-line py-2 last:border-b-0">
            <Skeleton w={`${width}%`} h={12} />
            <Skeleton w={44} h={10} />
          </li>
        ))}
      </ul>
    </SkeletonRegion>
  )
}

/** Everything leaders, executives, members and staff did in this group, newest first. */
export function GroupAuditCard({ groupId }: { groupId: string }) {
  const { entries, total, paging, isLoading, error, retry } = useGroupHistory(groupId)
  return (
    <Card className="mt-4">
      <CardHead title="Group history" />
      {isLoading && <AuditSkeleton />}
      {error && !entries.length && <ErrorState title="Could not load the history" error={error} onRetry={retry} />}
      {!error && !isLoading && !entries.length && <p className="faint small">Nothing has happened in this group yet.</p>}
      {entries.length > 0 && <ul>{entries.map((entry) => <AuditRow key={entry.id} entry={entry} />)}</ul>}
      <Pager paging={paging} total={total} />
    </Card>
  )
}
