import { PageHeader } from '@/components/shared'
import { Pager } from '../../shared/components/Pager'
import { GroupFilters } from '../components/GroupFilters'
import { GroupTabs } from '../components/GroupTabs'
import { GroupsTable } from '../components/GroupsTable'
import { useGroupList } from '../hooks/use-group-list'

export function GroupsPage() {
  const { tab, setTab, filters, setFilter, categoryOptions, rows, total, paging, counts } = useGroupList()
  return (
    <>
      <PageHeader title="Groups" />
      <GroupTabs value={tab} counts={counts} onChange={setTab} />
      <GroupFilters filters={filters} setFilter={setFilter} categoryOptions={categoryOptions} />
      <div className="mt-4"><GroupsTable tab={tab} rows={rows} /></div>
      <Pager paging={paging} total={total} />
    </>
  )
}
