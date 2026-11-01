import { Avatar, Card } from '@/components/shared'
import { useRequiredUser } from '@/stores/session-store'

export function ProfileSummary() {
  const user = useRequiredUser()
  return (
    <Card>
      <div className="row">
        <Avatar name={user.fullName} size="lg" />
        <div className="grow"><div className="h3">{user.fullName}</div><div className="small faint">{user.title ?? 'Directorate staff'}</div></div>
      </div>
    </Card>
  )
}
