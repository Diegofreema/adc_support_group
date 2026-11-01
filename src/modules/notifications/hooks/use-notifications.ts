import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { fetchNotifications, markAllRead } from '../services/notifications.service'
import type { NotificationFilter } from '../types/notification.types'
import { countUnread, filterNotifications, groupByDay } from '../utils/group-notifications'
import { notify } from '@/lib/toast'

const notificationsQuery = queryOptions({ queryKey: ['notifications'], queryFn: fetchNotifications })

/** Notification list view-model: filter, sections, unread count. */
export function useNotifications() {
  const [filter, setFilter] = useState<NotificationFilter>('all')
  const { data = [], isLoading } = useQuery(notificationsQuery)
  const sections = groupByDay(filterNotifications(data, filter))
  return { filter, setFilter, sections, unread: countUnread(data), isLoading }
}

export function useMarkAllRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: markAllRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationsQuery.queryKey })
      notify('All read')
    },
  })
}
