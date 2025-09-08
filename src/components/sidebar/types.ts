export interface NavigationItem {
  icon: any
  label: string
  href: string
  roles: string[] | null
}

export interface SidebarProps {
  isExpanded?: boolean
  setIsExpanded?: (expanded: boolean) => void
  isLoggedIn: boolean
  userData: any
  pathname: string
}