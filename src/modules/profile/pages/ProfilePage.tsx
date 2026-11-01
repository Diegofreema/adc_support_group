import { useDisclosure } from '@/hooks/use-disclosure'
import { LogoutConfirm } from '@/modules/auth'
import { MyGroupsList } from '@/modules/home'
import { AlertSettings } from '../components/AlertSettings'
import { ChangePasswordDialog } from '../components/ChangePasswordDialog'
import { ProfileDetailsForm } from '../components/ProfileDetailsForm'
import { ProfileHeader } from '../components/ProfileHeader'
import { SecurityList } from '../components/SecurityList'
import { useProfile } from '../hooks/use-profile'

export function ProfilePage() {
  const { data: profile } = useProfile()
  const password = useDisclosure()
  const logout = useDisclosure()
  if (!profile) return null
  return (
    <div className="main-narrow mx-auto">
      <ProfileHeader name={profile.fullName} phone={profile.phone} />
      <ProfileDetailsForm profile={profile} />
      <MyGroupsList groups={profile.groups} />
      <AlertSettings profile={profile} />
      <SecurityList onChangePassword={password.open} onLogout={logout.open} />
      <ChangePasswordDialog open={password.isOpen} onOpenChange={password.setOpen} />
      <LogoutConfirm open={logout.isOpen} onOpenChange={logout.setOpen} />
    </div>
  )
}
