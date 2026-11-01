import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'

const SHOW_DEVTOOLS = import.meta.env.VITE_DEVTOOLS === 'true'

/** Top-level frame for every page. Devtools only when VITE_DEVTOOLS=true. */
export function RootLayout() {
  return (
    <NuqsAdapter>
      <Outlet />
      {SHOW_DEVTOOLS && (
        <>
          <TanStackRouterDevtools position="bottom-left" />
          <ReactQueryDevtools buttonPosition="bottom-right" />
        </>
      )}
    </NuqsAdapter>
  )
}
