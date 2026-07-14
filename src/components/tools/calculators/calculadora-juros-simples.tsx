"use client"

import * as React from "react"
import { TrendingUp, Wallet } from "lucide-react"

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
  icon: Icon,
  prominent,
}: {
  label: string
  value: string
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
    </div>
  )
}

export default function SimpleInterestCalculator() {
  const [capital, setCapital] = React.useState("")
  const [taxa, setTaxa] = React.useState("")
  const [periodoTaxa, setPeriodoTaxa] = React.useState<"mes" | "ano">("mes")
  const [tempo, setTempo] = React.useState("")
  const [periodoTempo, setPeriodoTempo] = React.useState<"meses" | "anos">("meses")

  const c = safeNum(parseNumber(capital))
  const t = safeNum(parseNumber(taxa))
  const tmp = safeNum(parseNumber(tempo))

  // Normalizar taxa e tempo para o mesmo período (meses)
  const i = periodoTaxa === "ano" ? t / 12 : t
  const tempoMeses = periodoTempo === "anos" ? tmp * 12 : tmp

  const juros = c * (i / 100) * tempoMeses
  const montante = c + juros

  const vazio = c === 0 && t === 0 && tmp === 0

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="js-capital">Capital inicial</Label>
          <Input
            id="js-capital"
            inputMode="decimal"
            placeholder="R$ 0,00"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="js-taxa">Taxa de juros</Label>
          <div className="flex gap-2">
            <Input
              id="js-taxa"
              inputMode="decimal"
              placeholder="0,00"
              value={taxa}
              onChange={(e) => setTaxa(e.target.value)}
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
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="js-tempo">Tempo</Label>
          <div className="flex gap-2">
            <Input
              id="js-tempo"
              inputMode="decimal"
              placeholder="0"
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
              className="flex-1"
            />
            <Select
              value={periodoTempo}
              onValueChange={(v) => setPeriodoTempo(v as "meses" | "anos")}
            >
              <SelectTrigger className="w-[110px]" aria-label="Unidade do tempo">
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

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard
          label="Juros"
          value={vazio ? "—" : formatBRL(juros)}
          icon={TrendingUp}
        />
        <ResultCard
          label="Montante final"
          value={vazio ? "—" : formatBRL(montante)}
          icon={Wallet}
          prominent
        />
      </div>

      <p className="text-xs text-muted-foreground">
        No juros simples, os juros são calculados apenas sobre o capital
        inicial. Taxa e tempo são normalizados para meses antes do cálculo.
      </p>
    </div>
  )
}
