import { ErrorState, PageHeader, PageLoader, Segmented, Tabs } from '@/components/shared'
import { BoardEmpty } from '../components/BoardEmpty'
import { BoardList } from '../components/BoardList'
import { useLeaderboard } from '../hooks/use-leaderboard'
import { MEASURE_TIP, snapshotDay } from '../utils/board-text'

type View = ReturnType<typeof useLeaderboard>

export function LeaderboardPage() {
  const view = useLeaderboard()
  return (
    <>
      <PageHeader title="Leaderboard" subtitle="Last 30 days. Updated every morning." />
      <Tabs tabs={view.tabs} value={view.scope} onChange={view.setScope} label="Board" />
      <div className="mt-4"><Segmented options={view.measures} value={view.measure} onChange={view.setMeasure} label="Rank by" /></div>
      <div className="mt-4"><BoardBody view={view} /></div>
    </>
  )
}

function BoardBody({ view }: { view: View }) {
  if (view.isLoading) return <PageLoader shape="list" />
  if (view.error || !view.board) return <ErrorState title="Could not load the leaderboard" error={view.error} onRetry={view.retry} />
  if (!view.board.mine) return <BoardEmpty scope={view.scope} />
  return (
    <>
      <BoardList rows={view.board.rows} mine={view.board.mine} measure={view.measure} />
      <p className="muted small mt-3">{MEASURE_TIP[view.measure]}</p>
      {view.board.snapshotOn && <p className="faint small mt-1">Updated {snapshotDay(view.board.snapshotOn)}</p>}
    </>
  )
}
