"use client"

import * as React from "react"
import {
  differenceInDays,
  differenceInWeeks,
  intervalToDuration,
  isValid,
  parseISO,
} from "date-fns"
import { CalendarDays, Cake, Hourglass, Repeat } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function hojeISO(): string {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, "0")
  const dia = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mes}-${dia}`
}

function formatarNumero(v: number): string {
  return v.toLocaleString("pt-BR")
}

export default function CalculadoraIdade() {
  const hoje = hojeISO()
  const [nascimento, setNascimento] = React.useState("")
  const [referencia, setReferencia] = React.useState(hoje)

  const dataNasc = nascimento ? parseISO(nascimento) : null
  const dataRef = referencia ? parseISO(referencia) : null

  const valido =
    dataNasc !== null &&
    dataRef !== null &&
    isValid(dataNasc) &&
    isValid(dataRef) &&
    dataRef.getTime() >= dataNasc.getTime()

  const duration =
    valido && dataNasc && dataRef
      ? intervalToDuration({ start: dataNasc, end: dataRef })
      : null

  const totalDias = valido && dataNasc && dataRef ? differenceInDays(dataRef, dataNasc) : NaN
  const totalSemanas = valido && dataNasc && dataRef ? differenceInWeeks(dataRef, dataNasc) : NaN

  function usarHoje() {
    setReferencia(hojeISO())
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="id-nascimento" className="text-sm font-medium">
            Data de nascimento
          </Label>
          <Input
            id="id-nascimento"
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            aria-label="Data de nascimento"
            className="h-11 text-base"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="id-referencia" className="text-sm font-medium">
            Data de referência
          </Label>
          <div className="flex gap-2">
            <Input
              id="id-referencia"
              type="date"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              aria-label="Data de referência para o cálculo"
              className="h-11 flex-1 text-base"
            />
            <Button type="button" variant="outline" size="sm" onClick={usarHoje} className="h-11 px-3">
              <Repeat className="size-4" />
              <span className="sr-only sm:not-sr-only">Hoje</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Resultado principal */}
      <Card className="bg-brand-muted border-brand/30 gap-2 px-6 py-6">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Cake className="size-4 text-brand" />
          Sua idade
        </div>
        {valido && duration ? (
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-4xl font-bold tabular-nums text-brand sm:text-5xl">
              {duration.years ?? 0}
            </span>
            <span className="text-lg font-medium text-foreground">
              {duration.years === 1 ? "ano" : "anos"}
            </span>
            <span className="text-3xl font-bold tabular-nums text-foreground/80 sm:text-4xl">
              {duration.months ?? 0}
            </span>
            <span className="text-lg font-medium text-foreground">
              {duration.months === 1 ? "mês" : "meses"}
            </span>
            <span className="text-3xl font-bold tabular-nums text-foreground/80 sm:text-4xl">
              {duration.days ?? 0}
            </span>
            <span className="text-lg font-medium text-foreground">
              {duration.days === 1 ? "dia" : "dias"}
            </span>
          </div>
        ) : (
          <div className="text-3xl font-bold text-muted-foreground">—</div>
        )}
      </Card>

      {/* Estatísticas adicionais */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <CalendarDays className="size-3.5" />
            Total de dias
          </div>
          <p className="mt-1.5 text-2xl font-bold tabular-nums">
            {Number.isFinite(totalDias) ? formatarNumero(totalDias) : "—"}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Hourglass className="size-3.5" />
            Total de semanas
          </div>
          <p className="mt-1.5 text-2xl font-bold tabular-nums">
            {Number.isFinite(totalSemanas) ? formatarNumero(totalSemanas) : "—"}
          </p>
        </div>
        <div className="col-span-2 rounded-xl border bg-card p-4 sm:col-span-1">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Cake className="size-3.5" />
            Próximo aniversário
          </div>
          <p className="mt-1.5 text-lg font-semibold tabular-nums">
            {valido && dataNasc && dataRef
              ? calcularProximoAniversario(dataNasc, dataRef)
              : "—"}
          </p>
        </div>
      </div>

      {!valido && nascimento && referencia && (
        <p className="text-xs text-amber-600">
          A data de referência deve ser igual ou posterior à data de nascimento.
        </p>
      )}
    </div>
  )
}

/** Calcula quantos dias faltam para o próximo aniversário. */
function calcularProximoAniversario(nasc: Date, ref: Date): string {
  const proximo = new Date(ref.getFullYear(), nasc.getMonth(), nasc.getDate())
  if (proximo.getTime() < ref.getTime()) {
    proximo.setFullYear(ref.getFullYear() + 1)
  }
  const dias = Math.ceil((proximo.getTime() - ref.getTime()) / (1000 * 60 * 60 * 24))
  if (dias === 0) return "É hoje!"
  const dataFormatada = proximo.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  })
  return `${dataFormatada} (${dias} ${dias === 1 ? "dia" : "dias"})`
}
