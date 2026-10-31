import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

const links = [
  { to: '/', label: 'Home' },
  { to: '/supporters', label: 'Supporters' },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      {/* Flag-style stripe: green · white · red */}
      <div className="flex h-1">
        <span className="flex-1 bg-adc-green" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-adc-red" />
      </div>
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            ADC
          </span>
          <span className="hidden sm:inline">Support Group</span>
        </Link>
        <nav className="flex gap-4 text-sm">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: 'font-medium text-primary' }}
              activeOptions={{ exact: true }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm" className="ml-auto">
          <Link to="/join">Join us</Link>
        </Button>
      </div>
    </header>
  )
}
