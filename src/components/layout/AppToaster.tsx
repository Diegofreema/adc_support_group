import { Toaster } from 'sonner'

/** Ledger-styled toasts: ink bar with a green edge. */
export function AppToaster() {
  return (
    <Toaster
      position="bottom-center"
      offset={88}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'flex items-center gap-2.5 rounded-sm border-l-[3px] border-l-[#4CC383] bg-ink px-4 py-3 text-[0.9375rem] font-semibold text-white shadow-lg',
          error: 'border-l-destructive',
        },
      }}
    />
  )
}
