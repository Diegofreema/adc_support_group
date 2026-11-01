import type { ChapterOption, MemberRecord } from '../types'

export const memberChapters: Record<string, ChapterOption[]> = {
  grp_awn: [
    { id: 'chp_lagos', name: 'Lagos', joinCode: 'awn-lagos' },
    { id: 'chp_kano', name: 'Kano', joinCode: 'awn-kano' },
    { id: 'chp_plateau', name: 'Plateau', joinCode: 'awn-plateau' },
    { id: 'chp_fct', name: 'FCT', joinCode: 'awn-fct' },
  ],
  grp_kkr: [{ id: 'chp_fagge', name: 'Fagge', joinCode: 'kkr-fagge' }],
}

type Seed = [string, string, string, string, string, MemberRecord['joinedVia'], MemberRecord['role'], string?]
const SEEDS: Seed[] = [
  ['Amaka Okafor', '08035550142', 'Lagos', 'Surulere', 'chp_lagos', 'manual', 'leader', 'Leader'],
  ['Hadiza Musa', '08139001123', 'Kano', 'Gwale', 'chp_kano', 'excel', 'executive', 'Secretary'],
  ['Ngozi Eze', '08094452210', 'FCT', 'AMAC', 'chp_fct', 'link', 'executive', 'Treasurer'],
  ['Funke Bello', '08055512233', 'Lagos', 'Ikeja', 'chp_lagos', 'link', 'executive', 'PRO'],
  ['Chioma Nwosu', '08062214590', 'Lagos', 'Surulere', 'chp_lagos', 'link', 'member'],
  ['Tunde Yusuf', '08023347781', 'Kano', 'Fagge', 'chp_kano', 'link', 'member'],
  ['Bisi Adeyemi', '08025519087', 'Lagos', 'Ikeja', 'chp_lagos', 'link', 'coordinator', 'Coordinator'],
  ['Fatima Garba', '07051126640', 'Plateau', 'Jos North', 'chp_plateau', 'excel', 'member'],
  ['Ruth Dung', '08033300912', 'Plateau', 'Jos South', 'chp_plateau', 'excel', 'coordinator', 'Coordinator'],
  ['Aisha Lawal', '08167788120', 'Kano', 'Municipal', 'chp_kano', 'link', 'member'],
  ['Grace Udo', '09012340987', 'FCT', 'Bwari', 'chp_fct', 'excel', 'member'],
  ['Kemi Ojo', '08031239876', 'Lagos', 'Surulere', 'chp_lagos', 'excel', 'member'],
]

function toRecord([fullName, phone, state, lga, chapterId, joinedVia, role, title]: Seed, index: number): MemberRecord {
  const chapter = memberChapters.grp_awn!.find((item) => item.id === chapterId)
  return {
    id: `mem_${index + 1}`, groupId: 'grp_awn', fullName, phone, state, lga, ward: `${lga} ${(index % 4) + 1}`,
    chapterId, chapterName: chapter?.name, joinedVia, role, title, activityCount: (index * 3) % 11,
    joinedAt: new Date(Date.UTC(2026, 8, 2 + index * 3)).toISOString(),
  }
}

/** In-memory members table. */
export const membersDb: MemberRecord[] = SEEDS.map(toRecord)
