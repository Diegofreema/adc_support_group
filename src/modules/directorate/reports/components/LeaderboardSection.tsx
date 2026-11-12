import { Link } from '@tanstack/react-router'
import { Trophy } from 'lucide-react'

import {
  DataTable, EmptyState, ErrorState, SectionTitle, Segmented, SelectInput, SkeletonRegion, SkeletonTable, type Column,
} from '@/components/shared'
import { formatNumber } from '@/lib/format'
import { NO_CATEGORY } from '../../shared/constants/options'
import { Pager } from '../../shared/components/Pager'
import { useLeaderboard } from '../hooks/use-leaderboard'
import { BOARD_STATE_OPTIONS, MEASURE_OPTIONS, snapshotDay } from '../utils/leaderboard-options'
import type { BoardGroup } from '../types'

type Board = ReturnType<typeof useLeaderboard>

const COLUMNS: Column<BoardGroup>[] = [
  { key: 'place', header: 'Place', numeric: true, cell: (row) => <span className="bold">{row.place}</span> },
  { key: 'name', header: 'Group', main: true, cell: (row) => <Link to="/admin/groups/$groupId" params={{ groupId: row.groupId }} className="bold">{row.name}</Link> },
  { key: 'state', header: 'State', cell: (row) => row.state },
  { key: 'category', header: 'Category', className: 'hide-mobile', cell: (row) => row.category ?? NO_CATEGORY },
  { key: 'activities', header: 'Activities', numeric: true, cell: (row) => formatNumber(row.activities) },
  { key: 'people', header: 'People reached', numeric: true, cell: (row) => formatNumber(row.people) },
]

/** Verified groups ranked over the last 30 days, by board (state, category, or nationwide). */
export function LeaderboardSection() {
  const board = useLeaderboard()
  return (
    <section className="mt-6">
      <SectionTitle title="Leaderboard" action={board.snapshotOn && <span className="faint small">Updated {snapshotDay(board.snapshotOn)}</span>} />
      <p className="muted small">Approved activities in the last 30 days. Places are within the board you pick.</p>
      <LeaderboardFilters board={board} />
      <div className="mt-4"><LeaderboardBody board={board} /></div>
      <Pager paging={board.paging} total={board.total} />
    </section>
  )
}

function LeaderboardFilters({ board }: { board: Board }) {
  return (
    // Equal-width selects; one column on phones, the measure below them until there's room for three.
    <div className="mt-4 grid gap-2 md:grid-cols-2 min-[1200px]:grid-cols-3 md:items-center">
      <SelectInput aria-label="State" options={BOARD_STATE_OPTIONS} value={board.filters.state} onChange={(event) => board.setFilter('state')(event.target.value)} />
      <SelectInput aria-label="Category" options={board.categoryOptions} value={board.filters.category} onChange={(event) => board.setFilter('category')(event.target.value)} />
      <div className="md:col-span-2 min-[1200px]:col-span-1"><Segmented options={MEASURE_OPTIONS} value={board.measure} onChange={board.setMeasure} label="Rank by" /></div>
    </div>
  )
}

function LeaderboardBody({ board }: { board: Board }) {
  if (board.error && !board.rows.length) return <ErrorState title="Could not load the leaderboard" error={board.error} onRetry={board.retry} />
  if (board.isLoading) return <SkeletonRegion label="Loading the leaderboard"><SkeletonTable /></SkeletonRegion>
  if (!board.rows.length) return <EmptyState icon={Trophy} title="No ranked groups on this board yet" />
  return <DataTable rows={board.rows} columns={COLUMNS} rowKey={(row) => row.groupId} />
}
