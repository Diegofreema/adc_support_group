import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { buttonClassName, ErrorState, PageHeader, PageLoader, PendingGroupNote, Tabs } from '@/components/shared'
import { useGroupLocked } from '@/hooks/use-group-verified'
import { ActivityFeed } from '../components/ActivityFeed'
import { LoadMoreButton } from '@/components/shared'
import { ReviewQueue } from '../components/ReviewQueue'
import { DeleteDraftDialog, WaitingDrafts } from '../components/WaitingDrafts'
import { useActivityDrafts } from '../hooks/use-activity-drafts'
import { useActivityTabs } from '../hooks/use-activity-tabs'

type View = ReturnType<typeof useActivityTabs>

export function ActivitiesPage() {
  const view = useActivityTabs()
  const locked = useGroupLocked()
  return (
    <>
      <PageHeader title="Activities" actions={locked ? <PendingGroupNote /> : <RecordActivityLink />} />
      <Drafts />
      <Tabs tabs={view.tabs} value={view.tab} onChange={view.setTab} label="Activities" />
      <div className="mt-5"><ActivitiesBody view={view} /></div>
    </>
  )
}

function Drafts() {
  const drafts = useActivityDrafts()
  return (
    <>
      <WaitingDrafts drafts={drafts.drafts} sendingRef={drafts.sendingRef} onSend={drafts.sendNow} onDelete={drafts.startDelete} />
      <DeleteDraftDialog open={Boolean(drafts.deleting)} onOpenChange={drafts.closeDelete} onConfirm={drafts.confirmDelete} />
    </>
  )
}

function ActivitiesBody({ view }: { view: View }) {
  if (view.isLoading) return <PageLoader />
  if (view.error) return <ErrorState title="Could not load activities" error={view.error} onRetry={view.retry} />
  return (
    <>
      {view.tab === 'review' ? <ReviewQueue activities={view.activities} /> : <ActivityFeed activities={view.activities} />}
      <LoadMoreButton hasMore={view.hasMore} loading={view.isLoadingMore} onClick={view.loadMore} />
    </>
  )
}

function RecordActivityLink() {
  return (
    <Link to="/activities/new" className={buttonClassName('primary')}>
      <Plus className="i" aria-hidden />Record activity
    </Link>
  )
}
