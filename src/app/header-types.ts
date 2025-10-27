export interface HeaderConfig {
  currentPage: string | ((params: Record<string, string>, data?: any) => string)
  description?: string | ((params: Record<string, string>, data?: any) => string)
  backPage?: string | ((params: Record<string, string>) => string)
  dynamicData?: boolean
}

export interface ResolvedHeaderProps {
  currentPage: string
  description?: string
  backPage?: string
}