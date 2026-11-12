import { Link } from '@tanstack/react-router'
import { Download, UserPlus } from 'lucide-react'

import { Button, buttonClassName, ErrorState, FilterPills, PageHeader, PageLoader, SearchInput } from '@/components/shared'
import { useGroupLocked } from '@/hooks/use-group-verified'
import { useActiveGroupId } from '@/modules/groups'
import { countLabel } from '@/lib/format'
import { useRequiredUser } from '@/stores/session-store'
import { useExportMembers } from '../hooks/use-export-members'
import { useMemberActions } from '../hooks/use-member-actions'
import { useMemberList } from '../hooks/use-member-list'
import { useChapterOptions } from '../hooks/use-members'
import { MemberDialogs } from '../components/MemberDialogs'
import { MembersTable } from '../components/MembersTable'
import { Pagination } from '../components/Pagination'

export function MembersPage() {
  const groupId = useActiveGroupId()
  const list = useMemberList(groupId)
  const actions = useMemberActions()
  const chapters = useChapterOptions(groupId)
  const exportMembers = useExportMembers(groupId)
  const locked = useGroupLocked()
  const viewer = useRequiredUser()

  const headerActions = (
    <>
      <Button icon={Download} disabled={exportMembers.isPending} onClick={() => exportMembers.mutate(list.query)}>Export</Button>
      {!locked && <Link to="/members/add" className={buttonClassName('primary')}><UserPlus className="i" aria-hidden />Add</Link>}
    </>
  )

  return (
    <>
      <PageHeader title="Members" subtitle={countLabel(list.count, 'person', 'people')} actions={headerActions} />
      <SearchInput value={list.search} onChange={list.setSearch} placeholder="Name or phone" />
      <div className="mt-3"><FilterPills options={list.filterOptions} value={list.filter} onChange={list.setFilter} label="Filter members" /></div>
      <div className="mt-4"><MembersBody list={list} onOpen={actions.open} /></div>
      <Pagination page={list.pageData} onPage={list.setPage} pinned={list.count - list.pageData.total} />
      <MemberDialogs actions={actions} chapters={chapters.data ?? []} viewer={viewer} />
    </>
  )
}

function MembersBody({ list, onOpen }: { list: ReturnType<typeof useMemberList>; onOpen: Parameters<typeof MembersTable>[0]['onOpen'] }) {
  if (list.isLoading) return <PageLoader shape="table" />
  if (list.error) return <ErrorState title="Could not load members" error={list.error} onRetry={list.retry} />
  return <MembersTable members={list.rows} onOpen={onOpen} />
}
