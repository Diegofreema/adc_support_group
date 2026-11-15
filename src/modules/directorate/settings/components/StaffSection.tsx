import { Banner, Card, ErrorState, SkeletonList, SkeletonRegion } from '@/components/shared'
import { useStaff } from '../hooks/use-settings'
import { StaffRow } from './StaffRow'

/** Directorate staff are Rise Up's admins; they are added and removed in Rise Up's admin. */
export function StaffSection() {
  const { items, isLoading, error, retry } = useStaff()
  if (error) return <ErrorState title="Couldn't load the staff" error={error} onRetry={retry} />
  return (
    <>
      <Banner tone="info" className="mb-4">The Directorate is Rise Up's admin team. Add or remove staff in Rise Up's admin.</Banner>
      {isLoading
        ? <SkeletonRegion label="Loading staff"><SkeletonList rows={5} /></SkeletonRegion>
        : <Card flush>{items.map((member) => <StaffRow key={member.id} member={member} />)}</Card>}
    </>
  )
}
