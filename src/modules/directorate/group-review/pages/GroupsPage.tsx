import { PageHeader } from '@/components/shared'
import { GroupFilters } from '../components/GroupFilters'
import { GroupTabs } from '../components/GroupTabs'
import { GroupsTable } from '../components/GroupsTable'
import { useGroupList } from '../hooks/use-group-list'

export function GroupsPage() {
  const { tab, setTab, filters, setFilter, rows, counts } = useGroupList()
  return (
    <>
      <PageHeader title="Groups" />
      <GroupTabs value={tab} counts={counts} onChange={setTab} />
      <GroupFilters filters={filters} setFilter={setFilter} />
      <div className="mt-4"><GroupsTable tab={tab} rows={rows} /></div>
    </>
  )
}
