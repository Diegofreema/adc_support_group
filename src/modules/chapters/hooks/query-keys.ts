export const chapterKeys = {
  all: ['chapters'] as const,
  list: (groupId: string) => [...chapterKeys.all, 'list', groupId] as const,
  detail: (chapterId: string) => [...chapterKeys.all, 'detail', chapterId] as const,
  activities: (chapterId: string) => [...chapterKeys.all, 'activities', chapterId] as const,
}
