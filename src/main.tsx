import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AppErrorBoundary } from '@/components/layout/AppErrorBoundary'
import { AppToaster } from '@/components/layout/AppToaster'
import { queryClient } from '@/lib/query-client'
import { bootstrapSession } from '@/modules/auth'
import { routeTree } from './routeTree.gen'
import './index.css'

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  // Let TanStack Query own data freshness
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Route guards read the session synchronously: load it before the first render.
void bootstrapSession().then(() => createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <AppToaster />
      </QueryClientProvider>
    </AppErrorBoundary>
  </StrictMode>,
))
