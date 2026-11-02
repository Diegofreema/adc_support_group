import { LogoutButton } from '../components/LogoutButton'
import { MoreMenu } from '../components/MoreMenu'
import { ProfileSummary } from '../components/ProfileSummary'

export function MorePage() {
  return (
    <div className="main-narrow">
      <ProfileSummary />
      <MoreMenu />
      <LogoutButton />
    </div>
  )
}
