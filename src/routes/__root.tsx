import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'

import { NotFound } from '@/components/layout/NotFound'
import { RootLayout } from '@/components/layout/RootLayout'
import { RootError } from '@/components/layout/RootError'

export interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: RootError,
})
