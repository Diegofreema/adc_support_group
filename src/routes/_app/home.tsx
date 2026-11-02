import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '@/modules/home/pages/HomePage'

export const Route = createFileRoute('/_app/home')({
  staticData: { title: 'Home' },
  component: HomePage,
})
