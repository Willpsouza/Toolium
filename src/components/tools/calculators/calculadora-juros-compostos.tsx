"use client"

import * as React from "react"
import { PiggyBank, Wallet, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatBRL, parseNumber } from "@/lib/format"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function safeNum(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0
}

function ResultCard({
  label,
  value,
  hint,
  icon: Icon,
  prominent,
}: {
  label: string
  value: string
  hint?: string
  icon: React.ComponentType<{ className?: string }>
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
      <div className="flex items-center gap-2">
        <Icon
          className={cn("size-4", prominent ? "text-brand" : "text-muted-foreground")}
        />
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      </div>
      <p
        className={cn(
          "mt-1.5 font-semibold tabular-nums",
          prominent ? "text-2xl sm:text-3xl text-brand" : "text-lg sm:text-xl"
        )}
      >
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

export default function CompoundInterestCalculator() {
  const [valorInicial, setValorInicial] = React.useState("")
  const [aporteMensal, setAporteMensal] = React.useState("")
  const [taxaJuros, setTaxaJuros] = React.useState("")
  const [periodoTaxa, setPeriodoTaxa] = React.useState<"mes" | "ano">("mes")
  const [prazo, setPrazo] = React.useState("")
  const [periodoPrazo, setPeriodoPrazo] = React.useState<"meses" | "anos">("meses")

  const pv = safeNum(parseNumber(valorInicial))
  const pmt = safeNum(parseNumber(aporteMensal))
  const taxa = safeNum(parseNumber(taxaJuros))
  const prazoNum = safeNum(parseNumber(prazo))

  // Taxa mensal efetiva
  const i =
    periodoTaxa === "ano"
      ? Math.pow(1 + taxa / 100, 1 / 12) - 1
      : taxa / 100

  // Prazo em meses
  const n = periodoPrazo === "anos" ? prazoNum * 12 : prazoNum

  const montante =
    n === 0
      ? pv
      : pv * Math.pow(1 + i, n) +
        (i === 0 ? pmt * n : pmt * ((Math.pow(1 + i, n) - 1) / i))

  const totalInvestido = pv + pmt * n
  const jurosGanhos = montante - totalInvestido

  const vazio = pv === 0 && pmt === 0 && taxa === 0 && prazoNum === 0

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="jc-inicial">Valor inicial</Label>
          <Input
            id="jc-inicial"
            inputMode="decimal"
            placeholder="R$ 0,00"
            value={valorInicial}
            onChange={(e) => setValorInicial(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="jc-aporte">Aporte mensal</Label>
          <Input
            id="jc-aporte"
            inputMode="decimal"
            placeholder="R$ 0,00"
            value={aporteMensal}
            onChange={(e) => setAporteMensal(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="jc-taxa">Taxa de juros</Label>
          <div className="flex gap-2">
            <Input
              id="jc-taxa"
              inputMode="decimal"
              placeholder="0,00"
              value={taxaJuros}
              onChange={(e) => setTaxaJuros(e.target.value)}
              className="flex-1"
            />
            <Select
              value={periodoTaxa}
              onValueChange={(v) => setPeriodoTaxa(v as "mes" | "ano")}
            >
              <SelectTrigger className="w-[110px]" aria-label="Período da taxa">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mes">ao mês</SelectItem>
                <SelectItem value="ano">ao ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="jc-prazo">Prazo</Label>
          <div className="flex gap-2">
            <Input
              id="jc-prazo"
              inputMode="decimal"
              placeholder="0"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
              className="flex-1"
            />
            <Select
              value={periodoPrazo}
              onValueChange={(v) => setPeriodoPrazo(v as "meses" | "anos")}
            >
              <SelectTrigger className="w-[110px]" aria-label="Unidade do prazo">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meses">meses</SelectItem>
                <SelectItem value="anos">anos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultCard
          label="Montante final"
          value={vazio ? "—" : formatBRL(montante)}
          icon={PiggyBank}
          prominent
        />
        <ResultCard
          label="Total investido"
          value={vazio ? "—" : formatBRL(totalInvestido)}
          icon={Wallet}
        />
        <ResultCard
          label="Total de juros"
          value={vazio ? "—" : formatBRL(jurosGanhos)}
          icon={TrendingUp}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Cálculo com capitalização mensal e aportes feitos ao final de cada
        período.
      </p>
    </div>
  )
}
