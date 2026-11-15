import { Toaster } from 'sonner'

/** Ledger-styled toasts: ink bar with a coloured edge and an icon that reacts (see motion.css). */
export function AppToaster() {
  return (
    <Toaster
      position="bottom-center"
      offset={88}
      duration={5000}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'flex min-h-[52px] w-full items-center gap-3 rounded-sm border-l-4 border-l-[#4CC383] bg-ink px-4 py-3 text-base font-semibold text-white shadow-[var(--elev-3)]',
          error: 'border-l-[#FF9BA0]',
          warning: 'border-l-[#F2C46D]',
          info: 'border-l-[#8DB8EE]',
          description: 'text-sm font-normal text-[#C9D0D6]',
        },
      }}
    />
  )
}
