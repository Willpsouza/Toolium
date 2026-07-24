import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // 1. Função para assinar as mudanças do sistema externo
  const subscribe = React.useCallback((callback: () => void) => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", callback)
    return () => mql.removeEventListener("change", callback)
  }, [])

  // 2. Função para ler o valor atual no cliente (browser)
  const getSnapshot = React.useCallback(() => {
    return window.innerWidth < MOBILE_BREAKPOINT
  }, [])

  // 3. Função para ler o valor durante a renderização no servidor (SSR)
  const getServerSnapshot = React.useCallback(() => {
    return false // Fallback seguro: assume desktop no servidor
  }, [])

  // 4. Hook oficial do React 18+ para sincronização externa
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}