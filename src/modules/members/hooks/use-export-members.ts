import { useMutation } from '@tanstack/react-query'

import { fetchAllMembers } from '../services/members.service'
import type { MemberFilter } from '../types'
import { downloadText } from '../utils/download'
import { membersToCsv } from '../utils/export-members'
import { notify } from '@/lib/toast'

/** Load every member matching the filter and search (pages of 500), then download them as CSV. */
export function useExportMembers(groupId: string) {
  return useMutation({
    mutationFn: ({ filter, search }: { filter: MemberFilter; search: string }) => fetchAllMembers(groupId, filter, search),
    onSuccess: (members) => {
      downloadText('members.csv', membersToCsv(members))
      notify('Downloading')
    },
  })
}
