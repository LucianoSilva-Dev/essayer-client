import { UserLoginResponse } from "@/lib/apiCalls/auth/types"

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
  userData: UserLoginResponse | null
  pathname: string
}