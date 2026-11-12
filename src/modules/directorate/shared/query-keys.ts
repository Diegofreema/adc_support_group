/** Query keys for every directorate feature, so invalidation stays consistent. */
export const directorateKeys = {
  all: ['directorate'] as const,
  dashboard: (period: string) => [...directorateKeys.all, 'dashboard', period] as const,
  groups: () => [...directorateKeys.all, 'groups'] as const,
  group: (id: string) => [...directorateKeys.groups(), id] as const,
  activities: () => [...directorateKeys.all, 'activities'] as const,
  payments: () => [...directorateKeys.all, 'payments'] as const,
  causes: () => [...directorateKeys.all, 'causes'] as const,
  broadcasts: () => [...directorateKeys.all, 'broadcasts'] as const,
  reports: (period: string) => [...directorateKeys.all, 'reports', period] as const,
  exports: () => [...directorateKeys.all, 'exports'] as const,
  settings: (section: string) => [...directorateKeys.all, 'settings', section] as const,
  lookups: (kind: string) => [...directorateKeys.all, 'lookups', kind] as const,
}
