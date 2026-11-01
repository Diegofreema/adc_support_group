import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'

import { EmptyState } from '@/components/shared'
import { buttonClassName } from '@/components/shared/actions/Button'
import { SearchX } from 'lucide-react'

export interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  return (
    <NuqsAdapter>
      <Outlet />
      {import.meta.env.VITE_DEVTOOLS === 'true' && (
        <>
          <TanStackRouterDevtools position="bottom-left" />
          <ReactQueryDevtools buttonPosition="bottom-right" />
        </>
      )}
    </NuqsAdapter>
  )
}

function NotFound() {
  return (
    <div className="container py-20">
      <EmptyState icon={SearchX} title="Page not found" action={<Link to="/" className={buttonClassName('secondary')}>Go home</Link>} />
    </div>
  )
}
