import { Receipt } from 'lucide-react'

import { EmptyState, ErrorState, List, PageLoader, SectionTitle, Tabs } from '@/components/shared'
import { useEntryDetail } from '../hooks/use-entry-detail'
import { useMoneyEntries } from '../hooks/use-money-entries'
import { EntryDetailModal } from './EntryDetailModal'
import { EntryRow } from './EntryRow'
import { LoadMoreButton } from '@/components/shared'

/** Executives and coordinators: every entry, by kind, with proof on tap. */
export function RecordsSection({ canVoid }: { canVoid: boolean }) {
  const view = useMoneyEntries()
  const detail = useEntryDetail()
  return (
    <section className="mt-8">
      <SectionTitle title="Records" />
      <Tabs tabs={view.tabs} value={view.tab} onChange={view.setTab} label="Records" />
      <div className="mt-3">
        {view.isLoading ? <PageLoader /> : view.error ? <ErrorState title="Could not load the records" error={view.error} onRetry={view.retry} />
          : view.entries.length === 0 ? <EmptyState icon={Receipt} title="Nothing recorded yet" />
          : <List>{view.entries.map((entry) => <EntryRow key={entry.id} entry={entry} onOpen={detail.open} />)}</List>}
      </div>
      <LoadMoreButton hasMore={view.hasMore} loading={view.isLoadingMore} onClick={view.loadMore} />
      <EntryDetailModal detail={detail} canVoid={canVoid} />
    </section>
  )
}
