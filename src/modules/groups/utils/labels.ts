import type { GroupLevel } from '@/types/domain'

const LEVEL_LABEL: Record<GroupLevel, string> = {
  national: 'National',
  state: 'State',
  lga: 'LGA',
  ward: 'Ward',
  abroad: 'Abroad',
}

export function levelLabel(level: GroupLevel): string {
  return LEVEL_LABEL[level]
}
