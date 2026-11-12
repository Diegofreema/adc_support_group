import { MutationCache, QueryClient } from '@tanstack/react-query'

import { notify } from './toast'

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      /** The form shows this mutation's error itself; skip the toast. */
      inlineError?: boolean
    }
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
  // Every failed action tells the user why, unless its form already does.
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (!mutation.meta?.inlineError) notify(error.message, 'error')
    },
  }),
})
