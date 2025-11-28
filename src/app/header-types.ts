export interface HeaderConfig {
  // Functions now can receive params, optional data and optional searchParams
  currentPage: string | ((params: Record<string, string>, data?: any, searchParams?: URLSearchParams | any) => string)
  description?: string | ((params: Record<string, string>, data?: any, searchParams?: URLSearchParams | any) => string)
  backPage?: string | ((params: Record<string, string>, searchParams?: URLSearchParams | any) => string)
  dynamicData?: boolean
}

export interface ResolvedHeaderProps {
  currentPage: string
  description?: string
  backPage?: string
}