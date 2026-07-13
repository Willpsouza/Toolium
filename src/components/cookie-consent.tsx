"use client"

import * as React from "react"
import Link from "next/link"
import { Cookie, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const CONSENT_KEY = "toolium:cookie-consent"

type ConsentValue = "accepted" | "rejected" | "dismissed"

export function CookieConsent() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (!stored) {
        // pequeno atraso para não competir com o carregamento inicial
        const t = setTimeout(() => setVisible(true), 900)
        return () => clearTimeout(t)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  function setConsent(value: ConsentValue) {
    try {
      localStorage.setItem(CONSENT_KEY, value)
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-4 shadow-2xl sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3 sm:items-center">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand">
                <Cookie className="size-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Nós usamos cookies</p>
                <p className="text-xs text-muted-foreground text-pretty">
                  Usamos cookies para melhorar sua experiência e exibir anúncios relevantes. Ao
                  continuar, você concorda com nossa{" "}
                  <Link href="/cookies" className="font-medium text-brand underline-offset-2 hover:underline">
                    política de cookies
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:ml-auto sm:shrink-0">
              <Button size="sm" variant="ghost" onClick={() => setConsent("rejected")}>
                Recusar
              </Button>
              <Button
                size="sm"
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                onClick={() => setConsent("accepted")}
              >
                Aceitar
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="size-8"
                aria-label="Fechar"
                onClick={() => setConsent("dismissed")}
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
