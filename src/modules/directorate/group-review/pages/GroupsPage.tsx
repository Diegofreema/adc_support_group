import { PageHeader, SkeletonRegion, SkeletonTable } from '@/components/shared'
import { Pager } from '../../shared/components/Pager'
import { GroupFilters } from '../components/GroupFilters'
import { GroupTabs } from '../components/GroupTabs'
import { GroupsTable } from '../components/GroupsTable'
import { useGroupList } from '../hooks/use-group-list'

export function GroupsPage() {
  const { tab, setTab, filters, setFilter, filtered, categoryOptions, rows, total, paging, counts, isLoading } = useGroupList()
  return (
    <>
      <PageHeader title="Groups" />
      <GroupTabs value={tab} counts={counts} onChange={setTab} />
      <GroupFilters filters={filters} setFilter={setFilter} categoryOptions={categoryOptions} />
      <div className="mt-4">
        {isLoading
          ? <SkeletonRegion label="Loading groups"><SkeletonTable /></SkeletonRegion>
          : <GroupsTable tab={tab} rows={rows} filtered={filtered} />}
      </div>
      <Pager paging={paging} total={total} />
    </>
  )
}
