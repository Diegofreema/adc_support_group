import { Link } from '@tanstack/react-router'
import { Download, UserPlus } from 'lucide-react'

import { Button, buttonClassName, ErrorState, FilterPills, PageHeader, PageLoader, SearchInput } from '@/components/shared'
import { useGroupLocked } from '@/hooks/use-group-verified'
import { useActiveGroupId } from '@/modules/groups'
import { formatNumber } from '@/lib/format'
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
  const exportMembers = useExportMembers()
  const locked = useGroupLocked()

  const headerActions = (
    <>
      <Button icon={Download} onClick={() => exportMembers(list.filtered)}>Export</Button>
      {!locked && <Link to="/members/add" className={buttonClassName('primary')}><UserPlus className="i" aria-hidden />Add</Link>}
    </>
  )

  return (
    <>
      <PageHeader title="Members" subtitle={`${formatNumber(list.all.length)} people`} actions={headerActions} />
      <SearchInput value={list.search} onChange={list.setSearch} placeholder="Name or phone" />
      <div className="mt-3"><FilterPills options={list.filterOptions} value={list.filter} onChange={list.setFilter} label="Filter members" /></div>
      <div className="mt-4"><MembersBody list={list} onOpen={actions.open} /></div>
      <Pagination page={list.pageData} onPage={list.setPage} />
      <MemberDialogs actions={actions} chapters={chapters.data ?? []} />
    </>
  )
}

function MembersBody({ list, onOpen }: { list: ReturnType<typeof useMemberList>; onOpen: Parameters<typeof MembersTable>[0]['onOpen'] }) {
  if (list.isLoading) return <PageLoader />
  if (list.error) return <ErrorState title="Could not load members" error={list.error} onRetry={list.retry} />
  return <MembersTable members={list.pageData.items} onOpen={onOpen} />
}
