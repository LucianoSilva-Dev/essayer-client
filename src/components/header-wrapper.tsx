// components/header-wrapper.tsx
"use client"
import { usePathname, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from './header/header'
import { headerConfig } from '@/app/header-config'
import { getTurmaById } from '@/apiCalls/turma'
import { getRepertoriosIds } from '@/apiCalls/repertorio'
import { ResolvedHeaderProps } from '@/app/header-types'

export function HeaderWrapper() {
  const pathname = usePathname()
  const params = useParams()
  const [dynamicData, setDynamicData] = useState<any>(null)
  const [resolvedProps, setResolvedProps] = useState<ResolvedHeaderProps>({ 
    currentPage: 'Incita'
  })

  useEffect(() => {
    // Reset dynamicData quando a rota muda
    setDynamicData(null)
  }, [pathname])

  useEffect(() => {
    const resolveHeaderProps = async () => {
      const config = findMatchingConfig(pathname)
      
      if (!config) {
        setResolvedProps({ currentPage: 'Incita' })
        return
      }

      // Se precisa buscar dados dinâmicos e ainda não tem
      if (config.dynamicData && !dynamicData) {
        await fetchDynamicData(pathname, params as Record<string, string>)
        return // Será re-executado quando dynamicData mudar
      }

      // Resolve funções dinâmicas
      const currentPage = typeof config.currentPage === 'function' 
        ? config.currentPage(params as Record<string, string>, dynamicData) 
        : config.currentPage

      const description = typeof config.description === 'function'
        ? config.description(params as Record<string, string>, dynamicData)
        : config.description

      const backPage = typeof config.backPage === 'function'
        ? config.backPage(params as Record<string, string>)
        : config.backPage

      setResolvedProps({ 
        currentPage, 
        description, 
        backPage 
      })
    }

    resolveHeaderProps()
  }, [pathname, params, dynamicData])

  const findMatchingConfig = (currentPathname: string) => {
    // 1. Tenta match exato primeiro
    if (headerConfig[currentPathname]) {
      return headerConfig[currentPathname]
    }
    
    // 2. Procura por rotas dinâmicas
    for (const [route, config] of Object.entries(headerConfig)) {
      if (route.includes('[')) {
        const regexPattern = route
          .replace(/\[([^\]]+)\]/g, '([^/]+)')
          .replace(/\//g, '\\/')
        
        const regex = new RegExp(`^${regexPattern}$`)
        if (regex.test(currentPathname)) {
          return config
        }
      }
    }
    
    return null
  }

  const fetchDynamicData = async (currentPathname: string, currentParams: Record<string, string>) => {
    try {
      let data = null
      
      if (currentPathname.includes('/turma_aberta_')) {
        data = await getTurmaById(currentParams.turmaId)
      } else if (currentPathname.includes('/repertorio/')) {
        data = await getRepertoriosIds(currentParams.id)
      }
      
      setDynamicData(data)
    } catch (error) {
      console.error('Erro ao buscar dados do header:', error)
      // Mesmo em caso de erro, define dados vazios para evitar loop
      setDynamicData({})
    }
  }

  return <Header {...resolvedProps} />
}