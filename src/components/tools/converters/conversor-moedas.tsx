"use client"

import * as React from "react"
import { ArrowRight, ArrowLeftRight, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { formatNumber, parseNumber } from "@/lib/format"

// Taxas de referência: 1 USD = rate na moeda indicada.
const rates: Record<string, number> = {
  USD: 1,
  BRL: 5.0,
  EUR: 0.92,
  GBP: 0.79,
  ARS: 980,
  JPY: 150,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.2,
  MXN: 17,
}

interface CurrencyDef {
  code: string
  name: string
}

const currencies: CurrencyDef[] = [
  { code: "USD", name: "Dólar americano" },
  { code: "BRL", name: "Real brasileiro" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "Libra esterlina" },
  { code: "ARS", name: "Peso argentino" },
  { code: "JPY", name: "Iene japonês" },
  { code: "CAD", name: "Dólar canadense" },
  { code: "AUD", name: "Dólar australiano" },
  { code: "CHF", name: "Franco suíço" },
  { code: "CNY", name: "Yuan chinês" },
  { code: "MXN", name: "Peso mexicano" },
]

function convert(amount: number, from: string, to: string): number {
  // result = amount * (rates[to] / rates[from])
  return amount * (rates[to] / rates[from])
}

function fmtCurrency(value: number, code: string): string {
  if (!Number.isFinite(value)) return "—"
  // JPY e ARS normalmente não usam centavos; demais usam 2-4 casas.
  const noFraction = code === "JPY" || code === "ARS"
  const min = noFraction ? 0 : 2
  const max = noFraction ? 0 : 4
  return `${formatNumber(value, { minimumFractionDigits: min, maximumFractionDigits: max })} ${code}`
}

export default function CurrencyConverter() {
  const [raw, setRaw] = React.useState("100")
  const [from, setFrom] = React.useState("USD")
  const [to, setTo] = React.useState("BRL")

  const amount = parseNumber(raw)
  const hasValue = Number.isFinite(amount)
  const primary = hasValue ? convert(amount, from, to) : NaN

  function handleSwap() {
    setFrom(to)
    setTo(from)
  }

  return (
    <div className="space-y-6">
      {/* Entradas */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="cur-amount">Valor</Label>
          <Input
            id="cur-amount"
            inputMode="decimal"
            placeholder="Ex.: 100"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cur-from">De</Label>
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger id="cur-from" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.code} — {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cur-to">Para</Label>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger id="cur-to" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.code} — {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Conversão principal */}
      <div className="rounded-xl border border-border/70 bg-muted/30 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">{from}</span>
            <span className="text-lg font-semibold tabular-nums text-foreground">
              {hasValue
                ? formatNumber(amount, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "—"}
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleSwap}
            aria-label="Inverter moedas"
            className="shrink-0"
          >
            <ArrowLeftRight className="size-4" />
          </Button>

          <ArrowRight className="size-4 text-muted-foreground" />

          <div className="flex items-center gap-2 rounded-md border border-brand/30 bg-brand-muted/30 px-3 py-1.5">
            <span className="text-sm font-medium text-brand">{to}</span>
            <span className="text-xl font-bold tabular-nums text-brand sm:text-2xl">
              {hasValue
                ? formatNumber(primary, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })
                : "—"}
            </span>
          </div>
        </div>

        {hasValue && (
          <p className="mt-3 text-xs text-muted-foreground">
            Taxa de referência: 1 {from} ={" "}
            <span className="font-medium text-foreground">
              {formatNumber(rates[to] / rates[from], {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              })}{" "}
              {to}
            </span>
          </p>
        )}
      </div>

      {/* Aviso */}
      <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-500" />
        <span>
          Taxas de referência aproximadas. Para transações, consulte a cotação
          comercial.
        </span>
      </div>

      {/* Tabela com todas as moedas */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          {hasValue
            ? `${formatNumber(amount, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} ${from} equivale a`
            : "Equivalência em todas as moedas"}
        </h3>
        <div className="max-h-96 overflow-y-auto rounded-lg border border-border/60">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-muted/80 backdrop-blur">
              <tr className="text-left">
                <th className="px-3 py-2 font-medium text-muted-foreground">Moeda</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {currencies.map((c) => {
                const isOrigin = c.code === from
                const v = hasValue ? convert(amount, from, c.code) : NaN
                return (
                  <tr
                    key={c.code}
                    className={cn(
                      "transition-colors hover:bg-muted/40",
                      isOrigin && "bg-brand-muted/20"
                    )}
                  >
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{c.code}</span>
                        <span className="hidden text-xs text-muted-foreground sm:inline">
                          {c.name}
                        </span>
                        {isOrigin && (
                          <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand">
                            Origem
                          </span>
                        )}
                      </div>
                    </td>
                    <td
                      className={cn(
                        "px-3 py-2 text-right font-medium tabular-nums",
                        isOrigin ? "text-brand" : "text-foreground"
                      )}
                    >
                      {hasValue ? fmtCurrency(v, c.code) : "—"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
