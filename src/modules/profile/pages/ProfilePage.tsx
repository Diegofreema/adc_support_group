import { ErrorState, PageLoader } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { LogoutConfirm } from '@/modules/auth'
import { MyGroupsList } from '@/modules/home'
import { ChangePasswordDialog } from '../components/ChangePasswordDialog'
import { DeliveryNote } from '../components/DeliveryNote'
import { ProfileDetailsForm } from '../components/ProfileDetailsForm'
import { ProfileHeader } from '../components/ProfileHeader'
import { SecurityList } from '../components/SecurityList'
import { useProfile } from '../hooks/use-profile'

export function ProfilePage() {
  const { data: profile, error, refetch } = useProfile()
  const password = useDisclosure()
  const logout = useDisclosure()
  if (error && !profile) return <ErrorState title="Could not load your profile" error={error} onRetry={() => void refetch()} />
  if (!profile) return <PageLoader />
  return (
    <div className="main-narrow mx-auto">
      <ProfileHeader name={profile.fullName} phone={profile.phone} />
      <ProfileDetailsForm profile={profile} />
      <MyGroupsList groups={profile.groups} />
      <DeliveryNote profile={profile} />
      <SecurityList onChangePassword={password.open} onLogout={logout.open} />
      <ChangePasswordDialog open={password.isOpen} onOpenChange={password.setOpen} />
      <LogoutConfirm open={logout.isOpen} onOpenChange={logout.setOpen} />
    </div>
  )
}
