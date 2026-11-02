import { Link, useRouterState } from '@tanstack/react-router'

import { Avatar } from '@/components/shared/display/Avatar'
import { isNavItemActive, type NavItem, type NavSection } from '@/config/navigation'
import type { NavBadges } from './use-nav-badges'
import { BrandMark } from './BrandMark'

interface SidebarProps {
  sections: NavSection[]
  badges: NavBadges
  homePath: string
  subtitle?: string
  user: { name: string; caption: string; profilePath: string }
}

/** Ink sidebar shown on desktop. */
export function Sidebar({ sections, badges, homePath, subtitle, user }: SidebarProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  return (
    <aside className="sidebar" aria-label="Main menu">
      <BrandMark to={homePath} subtitle={subtitle} />
      <nav>
        {sections.map((section) => (
          <SidebarSection key={section.title} section={section} pathname={pathname} badges={badges} />
        ))}
      </nav>
      <div className="side-foot">
        <Link to={user.profilePath} className="side-link">
          <Avatar name={user.name} size="sm" />
          <span className="min-w-0">
            <span className="block font-semibold text-white">{user.name}</span>
            <span className="tiny block truncate">{user.caption}</span>
          </span>
        </Link>
      </div>
    </aside>
  )
}

interface SidebarSectionProps {
  section: NavSection
  pathname: string
  badges: NavBadges
}

function SidebarSection({ section, pathname, badges }: SidebarSectionProps) {
  return (
    <>
      <div className="side-section">{section.title}</div>
      {section.items.map((item) => (
        <SidebarLink key={item.to} item={item} active={isNavItemActive(item, pathname)} count={item.badgeKey ? badges[item.badgeKey] : undefined} />
      ))}
    </>
  )
}

function SidebarLink({ item, active, count }: { item: NavItem; active: boolean; count?: number }) {
  return (
    <Link to={item.to} activeOptions={{ exact: true }} className="side-link" aria-current={active ? 'page' : undefined}>
      <item.icon className="i" aria-hidden />
      <span>{item.label}</span>
      {count ? <span className="count">{count}</span> : null}
    </Link>
  )
}
