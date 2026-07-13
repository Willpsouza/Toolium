"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/seo"

interface AdBannerProps {
  slot?: string
  format?: "auto" | "horizontal" | "rectangle" | "vertical"
  className?: string
  label?: string
}

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

/**
 * Container de anúncio preparado para Google AdSense.
 * - Em desenvolvimento (sem AdSense ativo) mostra um placeholder elegante.
 * - Em produção, injeta o bloco de anúncio quando o script global já carregou.
 */
export function AdBanner({
  slot,
  format = "auto",
  className,
  label = "Publicidade",
}: AdBannerProps) {
  const insRef = React.useRef<HTMLModElement>(null)
  const [hasAdSense, setHasAdSense] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return
    if (window.adsbygoogle) {
      setHasAdSense(true)
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch {
        /* sem anúncio disponível */
      }
    }
  }, [])

  return (
    <aside
      aria-label="Anúncio"
      className={cn(
        "my-8 w-full overflow-hidden rounded-xl border border-dashed border-border/70 bg-muted/30",
        "min-h-[96px] flex items-center justify-center text-center",
        className
      )}
    >
      {hasAdSense && slot ? (
        <ins
          ref={insRef}
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={siteConfig.adsenseClient}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex flex-col items-center gap-1 px-4 py-6 text-muted-foreground/70">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">{label}</span>
          <span className="text-xs">Espaço reservado para anúncio</span>
        </div>
      )}
    </aside>
  )
}
