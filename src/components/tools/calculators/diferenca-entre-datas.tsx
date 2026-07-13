"use client"

import * as React from "react"
import { differenceInDays, isValid, parseISO } from "date-fns"
import { ArrowRight, CalendarRange, CalendarDays, CalendarClock, Calendar } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function formatarNumero(v: number, decimais = 0): string {
  return v.toLocaleString("pt-BR", {
    minimumFractionDigits: decimais,
    maximumFractionDigits: decimais,
  })
}

interface CartaoResultadoProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  unidade: string
  valor: string
  destaque?: boolean
}

function CartaoResultado({ icon: Icon, label, unidade, valor, destaque = false }: CartaoResultadoProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-xl border p-4 transition-colors",
        destaque ? "border-brand/40 bg-brand-muted" : "bg-card"
      )}
    >
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Icon className={cn("size-3.5", destaque && "text-brand")} />
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span
          className={cn(
            "text-2xl font-bold tabular-nums sm:text-3xl",
            destaque && "text-brand"
          )}
        >
          {valor}
        </span>
        <span className="text-xs text-muted-foreground">{unidade}</span>
      </div>
    </div>
  )
}

export default function DiferencaEntreDatas() {
  const [inicial, setInicial] = React.useState("")
  const [final, setFinal] = React.useState("")

  const dataInicial = inicial ? parseISO(inicial) : null
  const dataFinal = final ? parseISO(final) : null

  const valido =
    dataInicial !== null &&
    dataFinal !== null &&
    isValid(dataInicial) &&
    isValid(dataFinal)

  const diasTotais = valido && dataInicial && dataFinal
    ? Math.abs(differenceInDays(dataFinal, dataInicial))
    : NaN

  const semanas = Number.isFinite(diasTotais) ? diasTotais / 7 : NaN
  const meses = Number.isFinite(diasTotais) ? diasTotais / 30.44 : NaN
  const anos = Number.isFinite(diasTotais) ? diasTotais / 365.25 : NaN

  function inverter() {
    setInicial(final)
    setFinal(inicial)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Inputs */}
      <div className="flex flex-col gap-3">
        <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dd-inicial" className="text-sm font-medium">
              Data inicial
            </Label>
            <Input
              id="dd-inicial"
              type="date"
              value={inicial}
              onChange={(e) => setInicial(e.target.value)}
              aria-label="Data inicial"
              className="h-11 text-base"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={inverter}
            disabled={!inicial || !final}
            className="mb-0.5 h-11 self-end px-3 sm:self-auto"
            aria-label="Inverter datas"
          >
            <ArrowRight className="size-4" />
          </Button>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dd-final" className="text-sm font-medium">
              Data final
            </Label>
            <Input
              id="dd-final"
              type="date"
              value={final}
              onChange={(e) => setFinal(e.target.value)}
              aria-label="Data final"
              className="h-11 text-base"
            />
          </div>
        </div>
      </div>

      {/* Grid de resultados */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <CartaoResultado
          icon={CalendarDays}
          label="Dias totais"
          unidade="dias"
          valor={Number.isFinite(diasTotais) ? formatarNumero(diasTotais) : "—"}
          destaque
        />
        <CartaoResultado
          icon={CalendarRange}
          label="Semanas"
          unidade="sem."
          valor={Number.isFinite(semanas) ? formatarNumero(semanas) : "—"}
        />
        <CartaoResultado
          icon={CalendarClock}
          label="Meses (aprox.)"
          unidade="meses"
          valor={Number.isFinite(meses) ? formatarNumero(meses, 1) : "—"}
        />
        <CartaoResultado
          icon={Calendar}
          label="Anos (aprox.)"
          unidade="anos"
          valor={Number.isFinite(anos) ? formatarNumero(anos, 2) : "—"}
        />
      </div>

      {/* Detalhamento */}
      {valido && dataInicial && dataFinal && (
        <div className="rounded-xl border bg-muted/30 px-5 py-4 text-sm text-muted-foreground">
          <p>
            Entre <strong className="text-foreground">{dataInicial.toLocaleDateString("pt-BR")}</strong> e{" "}
            <strong className="text-foreground">{dataFinal.toLocaleDateString("pt-BR")}</strong> há{" "}
            <strong className="text-foreground">{formatarNumero(diasTotais)} dias</strong>. As conversões
            para meses e anos são aproximadas (considerando meses de 30,44 dias e anos de 365,25 dias).
          </p>
        </div>
      )}

      {!valido && (inicial || final) && (
        <p className="text-xs text-amber-600">
          Selecione as duas datas para calcular a diferença entre elas.
        </p>
      )}
      {!valido && !inicial && !final && (
        <p className="text-xs text-muted-foreground">
          Escolha uma data inicial e uma data final para ver a diferença em dias, semanas, meses e anos.
        </p>
      )}
    </div>
  )
}
