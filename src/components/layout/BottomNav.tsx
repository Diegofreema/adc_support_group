import { Link, useRouterState } from '@tanstack/react-router'

import { isNavItemActive, type NavItem } from '@/config/navigation'

/** Phone tab bar. */
export function BottomNav({ items }: { items: NavItem[] }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  return (
    <nav className="bottomnav" aria-label="Main menu">
      {items.map((item) => (
        <Link key={item.to} to={item.to} aria-current={isNavItemActive(item, pathname) ? 'page' : undefined}>
          <span className="nav-ico"><item.icon className="i" aria-hidden /></span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
