import { getRouteApi } from '@tanstack/react-router'

import { PageLoader } from '@/components/shared'
import { CheckinFailed, CheckinSuccess } from '../components/CheckinResult'
import { useCheckIn } from '../hooks/use-check-in'

const routeApi = getRouteApi('/_app/events/checkin/$code')

/** Opened from the venue QR: checks in straight away. */
export function CheckinPage() {
  const { code } = routeApi.useParams()
  const checkin = useCheckIn(code)
  return (
    <div className="main-narrow mx-auto">
      {checkin.event && <CheckinSuccess event={checkin.event} />}
      {checkin.error && <CheckinFailed error={checkin.error} onRetry={checkin.retry} />}
      {checkin.isPending && (
        <>
          <p className="bold text-center">Checking you in…</p>
          <PageLoader />
        </>
      )}
    </div>
  )
}
