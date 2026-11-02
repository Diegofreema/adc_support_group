export const groupKeys = {
  all: ['groups'] as const,
  detail: (groupId: string) => [...groupKeys.all, groupId] as const,
}
