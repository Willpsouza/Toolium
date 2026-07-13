"use client"

import * as React from "react"
import { Percent, TrendingUp, TrendingDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatNumber, parseNumber } from "@/lib/format"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

type Mode = "de" | "aumento" | "desconto"

function safeNum(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0
}

function ResultBox({
  label,
  value,
  hint,
  prominent,
}: {
  label: string
  value: string
  hint?: string
  prominent?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 sm:p-5",
        prominent
          ? "border-brand/30 bg-brand-muted/60"
          : "border-border bg-muted/40"
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-semibold tabular-nums",
          prominent ? "text-2xl sm:text-3xl text-brand" : "text-xl"
        )}
      >
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

export default function PercentCalculator() {
  const [valor, setValor] = React.useState("")
  const [porcentagem, setPorcentagem] = React.useState("")
  const [mode, setMode] = React.useState<Mode>("de")

  const v = safeNum(parseNumber(valor))
  const p = safeNum(parseNumber(porcentagem))

  const fracao = (p / 100) * v

  const aumento = fracao
  const finalAumento = v + aumento

  const desconto = fracao
  const finalDesconto = v - desconto

  return (
    <div className="space-y-5">
      <Tabs value={mode} onValueChange={(m) => setMode(m as Mode)}>
        <TabsList className="w-full">
          <TabsTrigger value="de" className="flex-1">
            <Percent className="size-4" />
            <span className="hidden sm:inline">Porcentagem de um valor</span>
            <span className="sm:hidden">% de valor</span>
          </TabsTrigger>
          <TabsTrigger value="aumento" className="flex-1">
            <TrendingUp className="size-4" />
            <span className="hidden sm:inline">Aumento percentual</span>
            <span className="sm:hidden">Aumento</span>
          </TabsTrigger>
          <TabsTrigger value="desconto" className="flex-1">
            <TrendingDown className="size-4" />
            <span className="hidden sm:inline">Desconto percentual</span>
            <span className="sm:hidden">Desconto</span>
          </TabsTrigger>
        </TabsList>

        <div className="grid gap-4 sm:grid-cols-2 mt-1">
          <div className="space-y-1.5">
            <Label htmlFor="pct-valor">Valor</Label>
            <Input
              id="pct-valor"
              inputMode="decimal"
              placeholder="0,00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pct-porcentagem">Porcentagem (%)</Label>
            <Input
              id="pct-porcentagem"
              inputMode="decimal"
              placeholder="0,00"
              value={porcentagem}
              onChange={(e) => setPorcentagem(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="de" className="mt-4">
          <ResultBox
            label="Resultado"
            prominent
            value={
              v === 0 && p === 0 && !valor && !porcentagem
                ? "—"
                : formatNumber(fracao)
            }
            hint={
              v > 0 || p > 0
                ? `${formatNumber(p, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}% de ${formatNumber(v)} = ${formatNumber(fracao)}`
                : "Informe o valor e a porcentagem para calcular."
            }
          />
        </TabsContent>

        <TabsContent value="aumento" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultBox
              label="Aumento"
              value={v === 0 && p === 0 ? "—" : formatNumber(aumento)}
            />
            <ResultBox
              label="Valor final"
              prominent
              value={v === 0 && p === 0 ? "—" : formatNumber(finalAumento)}
              hint={
                v > 0 || p > 0
                  ? `${formatNumber(v)} + ${formatNumber(p, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`
                  : undefined
              }
            />
          </div>
        </TabsContent>

        <TabsContent value="desconto" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultBox
              label="Desconto"
              value={v === 0 && p === 0 ? "—" : formatNumber(desconto)}
            />
            <ResultBox
              label="Valor final"
              prominent
              value={v === 0 && p === 0 ? "—" : formatNumber(finalDesconto)}
              hint={
                v > 0 || p > 0
                  ? `${formatNumber(v)} − ${formatNumber(p, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`
                  : undefined
              }
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
