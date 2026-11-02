export const memberKeys = {
  all: ['members'] as const,
  list: (groupId: string) => [...memberKeys.all, 'list', groupId] as const,
  chapters: (groupId: string) => [...memberKeys.all, 'chapters', groupId] as const,
}
