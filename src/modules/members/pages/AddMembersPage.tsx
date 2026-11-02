import { ChoiceTiles } from '@/components/shared'
import { useActiveGroupId } from '@/modules/groups'
import { AddMemberForm } from '../components/AddMemberForm'
import { LinkPanel } from '../components/LinkPanel'
import { QrPanel } from '../components/QrPanel'
import { useAddMethod } from '../hooks/use-add-method'
import { useInviteTarget } from '../hooks/use-invite-target'
import { ADD_METHODS } from '../utils/add-methods'

export function AddMembersPage() {
  const groupId = useActiveGroupId()
  const { method, choose } = useAddMethod()
  const invite = useInviteTarget(groupId)
  return (
    <div className="main-narrow mx-auto">
      <h1 className="h1">Add members</h1>
      <div className="mt-5 [&_.choice-grid]:!grid-cols-2">
        <ChoiceTiles name="add-method" options={ADD_METHODS} value={method} onChange={choose} label="How to add" />
      </div>
      <div className="mt-5">
        {method === 'link' && <LinkPanel joinCode={invite.joinCode} inviteName={invite.inviteName} chapters={invite.chapters} chapterId={invite.chapterId} onChapterChange={invite.setChapterId} />}
        {method === 'qr' && <QrPanel joinCode={invite.joinCode} />}
        {method === 'one' && <AddMemberForm groupId={groupId} chapters={invite.chapters} />}
      </div>
    </div>
  )
}
