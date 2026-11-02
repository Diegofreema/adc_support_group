import type { MemberRecord } from '../types'
import { downloadText } from '../utils/download'
import { membersToCsv } from '../utils/export-members'
import { notify } from '@/lib/toast'

export function useExportMembers(): (members: MemberRecord[]) => void {
  return (members) => {
    downloadText('members.csv', membersToCsv(members))
    notify('Downloading')
  }
}
