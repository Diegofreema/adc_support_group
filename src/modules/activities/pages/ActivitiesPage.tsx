import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { buttonClassName, PageHeader, PageLoader, Tabs } from '@/components/shared'
import { ActivityFeed } from '../components/ActivityFeed'
import { ReviewQueue } from '../components/ReviewQueue'
import { useActivityTabs } from '../hooks/use-activity-tabs'

export function ActivitiesPage() {
  const view = useActivityTabs()
  return (
    <>
      <PageHeader title="Activities" actions={<RecordActivityLink />} />
      <Tabs tabs={view.tabs} value={view.tab} onChange={view.setTab} label="Activities" />
      <div className="mt-5">
        {view.isLoading ? <PageLoader /> : null}
        {!view.isLoading && view.tab === 'review' ? <ReviewQueue activities={view.visible} /> : null}
        {!view.isLoading && view.tab !== 'review' ? <ActivityFeed activities={view.visible} /> : null}
      </div>
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
