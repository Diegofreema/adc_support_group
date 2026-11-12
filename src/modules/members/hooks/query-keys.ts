import type { RosterQuery } from '../types'

export const memberKeys = {
  all: ['members'] as const,
  page: (groupId: string, query: RosterQuery) => [...memberKeys.all, 'page', groupId, query] as const,
  chapters: (groupId: string) => [...memberKeys.all, 'chapters', groupId] as const,
}
