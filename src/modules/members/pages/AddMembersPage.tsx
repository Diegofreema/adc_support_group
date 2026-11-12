import { ChoiceTiles, PendingGroupNote } from '@/components/shared'
import { useGroupLocked } from '@/hooks/use-group-verified'
import { AddMemberForm } from '../components/AddMemberForm'
import { LinkPanel } from '../components/LinkPanel'
import { QrPanel } from '../components/QrPanel'
import { useAddMethod } from '../hooks/use-add-method'
import { useInviteTarget } from '../hooks/use-invite-target'
import { ADD_METHODS } from '../utils/add-methods'
import { useActiveGroupId } from '@/modules/groups'

export function AddMembersPage() {
  const groupId = useActiveGroupId()
  const locked = useGroupLocked()
  return (
    <div className="main-narrow mx-auto">
      <h1 className="h1">Add members</h1>
      {locked ? <PendingGroupNote className="mt-5" /> : <AddMethods groupId={groupId} />}
    </div>
  )
}

function AddMethods({ groupId }: { groupId: string }) {
  const { method, choose } = useAddMethod()
  const invite = useInviteTarget(groupId)
  return (
    <>
      <div className="mt-5 [&_.choice-grid]:!grid-cols-2">
        <ChoiceTiles name="add-method" options={ADD_METHODS} value={method} onChange={choose} label="How to add" />
      </div>
      <div className="mt-5">
        {method === 'link' && <LinkPanel joinCode={invite.joinCode} inviteName={invite.inviteName} chapters={invite.chapters} chapterId={invite.chapterId} onChapterChange={invite.setChapterId} />}
        {method === 'qr' && <QrPanel joinCode={invite.joinCode} inviteName={invite.inviteName} />}
        {method === 'one' && <AddMemberForm chapters={invite.chapters} />}
      </div>
    </>
  )
}
