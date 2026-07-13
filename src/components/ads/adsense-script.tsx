"use client"

import * as React from "react"
import Script from "next/script"
import { siteConfig } from "@/lib/seo"

const CONSENT_KEY = "toolium:cookie-consent"

/**
 * Carrega o script do Google AdSense somente após o usuário aceitar cookies
 * (consentimento "accepted" no banner de cookies). Em conformidade com LGPD/GDPR.
 *
 * - Se o consentimento ainda não foi dado (banner visível), não carrega.
 * - Se foi recusado/dismissed, não carrega.
 * - Se foi aceito, carrega com strategy="afterInteractive".
 *
 * Ouvir mudanças no localStorage permite carregar o script no momento em que
 * o usuário clica em "Aceitar" no banner (sem precisar recarregar a página).
 */
export function AdsenseScript() {
  const [consented, setConsented] = React.useState(false)

  React.useEffect(() => {
    function check() {
      try {
        const stored = localStorage.getItem(CONSENT_KEY)
        setConsented(stored === "accepted")
      } catch {
        setConsented(false)
      }
    }
    check()

    // Ouvir mudanças no localStorage (evento disparado pelo CookieConsent
    // quando o usuário aceita, em outra instância do componente).
    window.addEventListener("storage", check)
    // Ouvir evento customizado disparado pelo CookieConsent na mesma aba.
    window.addEventListener("toolium:cookie-consent-changed", check)
    return () => {
      window.removeEventListener("storage", check)
      window.removeEventListener("toolium:cookie-consent-changed", check)
    }
  }, [])

  if (!consented) return null

  return (
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
      crossOrigin="anonymous"
    />
  )
}
