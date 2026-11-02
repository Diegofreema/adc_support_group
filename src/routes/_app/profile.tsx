import { createFileRoute } from '@tanstack/react-router'

import { ProfilePage } from '@/modules/profile/pages/ProfilePage'

export const Route = createFileRoute('/_app/profile')({
  staticData: { title: 'Profile' },
  component: ProfilePage,
})
