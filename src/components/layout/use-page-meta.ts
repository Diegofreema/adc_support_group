import { useMatches } from '@tanstack/react-router'

export interface PageMeta {
  title?: string
  backTo?: string
}

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    /** Title shown in the top bar. */
    title?: string
    /** Show a back arrow; this path is used when there's no history. */
    backTo?: string
  }
}

/** Title/back info from the deepest route that declares it. */
export function usePageMeta(): PageMeta {
  const matches = useMatches()
  const match = [...matches].reverse().find((item) => item.staticData?.title)
  return { title: match?.staticData.title, backTo: match?.staticData.backTo }
}
