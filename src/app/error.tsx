"use client"

import * as React from "react"
import Link from "next/link"
import { RotateCcw, Home as HomeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Boundary de erro global (App Router).
 * Captura erros de runtime em qualquer rota e mostra uma UI amigável em pt-BR,
 * sem vazar detalhes técnicos do erro para o usuário final.
 * Em produção, o Next.js já esconde stack traces; este componente garante UX consistente.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Log do erro para monitoramento (em produção, integrar com Sentry/Logflare).
    // Não expor detalhes ao usuário.
    if (process.env.NODE_ENV === "production") {
      console.error("Erro capturado:", error.digest ?? "sem digest")
    } else {
      console.error(error)
    }
  }, [error])

  return (
    <div className="container-page py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-6xl font-bold tracking-tight text-brand sm:text-7xl">500</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl text-balance">
          Algo deu errado
        </h1>
        <p className="mt-3 text-muted-foreground text-pretty">
          Ocorreu um erro inesperado ao processar sua solicitação. Tente novamente ou volte para o
          início.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset} className="bg-brand text-brand-foreground hover:bg-brand/90">
            <RotateCcw className="size-4" />
            Tentar novamente
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <HomeIcon className="size-4" />
              Ir para o início
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
