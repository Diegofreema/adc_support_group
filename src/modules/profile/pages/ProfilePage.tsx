import { ErrorState, PageLoader } from '@/components/shared'
import { useDisclosure } from '@/hooks/use-disclosure'
import { LogoutConfirm } from '@/modules/auth'
import { MyGroupsList } from '@/modules/home'
import { AccountList } from '../components/AccountList'
import { ChangePasswordDialog } from '../components/ChangePasswordDialog'
import { DeleteDetailsConfirm } from '../components/DeleteDetailsConfirm'
import { DeletionPendingCard } from '../components/DeletionPendingCard'
import { DeliveryNote } from '../components/DeliveryNote'
import { LeaveGroupConfirm } from '../components/LeaveGroupConfirm'
import { ProfileDetailsForm } from '../components/ProfileDetailsForm'
import { ProfileHeader } from '../components/ProfileHeader'
import { SecurityList } from '../components/SecurityList'
import { useAccountDeletion } from '../hooks/use-account-deletion'
import { useLeaveGroup } from '../hooks/use-leave-group'
import { useProfile } from '../hooks/use-profile'
import type { Profile } from '../types/profile.types'

export function ProfilePage() {
  const { data: profile, error, refetch } = useProfile()
  const password = useDisclosure()
  const logout = useDisclosure()
  const deletion = useAccountDeletion()
  if (error && !profile) return <ErrorState title="Could not load your profile" error={error} onRetry={() => void refetch()} />
  if (!profile) return <PageLoader shape="detail" />
  return (
    <div className="main-narrow mx-auto">
      <ProfileHeader name={profile.fullName} phone={profile.phone} />
      {profile.pendingDeletion && <DeletionPendingCard pending={profile.pendingDeletion} onCancel={deletion.cancel} isPending={deletion.isPending} />}
      <ProfileDetailsForm profile={profile} />
      <MyGroupsList groups={profile.groups} />
      <DeliveryNote profile={profile} />
      <SecurityList onChangePassword={password.open} onLogout={logout.open} />
      <AccountSection profile={profile} onDeleteDetails={deletion.request} />
      <ChangePasswordDialog open={password.isOpen} onOpenChange={password.setOpen} />
      <LogoutConfirm open={logout.isOpen} onOpenChange={logout.setOpen} />
    </div>
  )
}

/** Leave group and delete my details, with their confirmations. */
function AccountSection({ profile, onDeleteDetails }: { profile: Profile; onDeleteDetails: () => void }) {
  const leave = useDisclosure()
  const remove = useDisclosure()
  const leaveGroup = useLeaveGroup()
  const group = profile.groups[0]
  return (
    <>
      <AccountList
        isLeader={profile.isLeader} inGroup={Boolean(group)} deletionPending={Boolean(profile.pendingDeletion)}
        onLeaveGroup={leave.open} onDeleteDetails={remove.open}
      />
      {group && <LeaveGroupConfirm open={leave.isOpen} onOpenChange={leave.setOpen} groupName={group.name} onConfirm={() => leaveGroup.mutate()} />}
      <DeleteDetailsConfirm open={remove.isOpen} onOpenChange={remove.setOpen} onConfirm={onDeleteDetails} />
    </>
  )
}
