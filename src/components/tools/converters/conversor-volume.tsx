"use client"

import * as React from "react"
import { ArrowRight, ArrowLeftRight } from "lucide-react"
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

interface UnitDef {
  value: string
  label: string
}

// Base: litro (l). 1 unidade = X litros.
const factors: Record<string, number> = {
  ml: 0.001,
  l: 1,
  m3: 1000,
  gal_us: 3.78541,
  gal_uk: 4.54609,
  xicara: 0.24,
  colher_sopa: 0.015,
  colher_cha: 0.005,
  ft3: 28.3168,
}

const units: UnitDef[] = [
  { value: "ml", label: "Mililitros (ml)" },
  { value: "l", label: "Litros (l)" },
  { value: "m3", label: "Metros cúbicos (m³)" },
  { value: "gal_us", label: "Galão (EUA)" },
  { value: "gal_uk", label: "Galão (UK)" },
  { value: "xicara", label: "Xícara" },
  { value: "colher_sopa", label: "Colher de sopa" },
  { value: "colher_cha", label: "Colher de chá" },
  { value: "ft3", label: "Pés cúbicos (ft³)" },
]

function convertAll(value: number, fromUnit: string): Record<string, number> {
  const inBase = value * factors[fromUnit]
  return Object.fromEntries(
    Object.entries(factors).map(([u, f]) => [u, inBase / f])
  )
}

function fmt(value: number): string {
  if (!Number.isFinite(value)) return "—"
  if (value === 0) return "0"
  const abs = Math.abs(value)
  if (abs < 1e-6 || abs >= 1e9) return value.toExponential(4)
  let digits: number
  if (abs < 1) digits = 6
  else if (abs < 100) digits = 4
  else if (abs < 10000) digits = 2
  else digits = 0
  return formatNumber(value, { minimumFractionDigits: 0, maximumFractionDigits: digits })
}

export default function VolumeConverter() {
  const [raw, setRaw] = React.useState("1")
  const [from, setFrom] = React.useState("l")
  const [to, setTo] = React.useState("gal_us")

  const value = parseNumber(raw)
  const hasValue = Number.isFinite(value)
  const all = hasValue ? convertAll(value, from) : null
  const primary = all ? fmt(all[to]) : "—"

  function handleSwap() {
    setFrom(to)
    setTo(from)
  }

  return (
    <div className="space-y-6">
      {/* Entrada */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="vol-value">Valor</Label>
          <Input
            id="vol-value"
            inputMode="decimal"
            placeholder="Ex.: 1"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vol-from">Unidade de origem</Label>
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger id="vol-from" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {units.map((u) => (
                <SelectItem key={u.value} value={u.value}>
                  {u.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Conversão principal */}
      <div className="rounded-xl border border-border/70 bg-muted/30 p-4 sm:p-5">
        <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr_auto]">
          <div className="space-y-2">
            <Label htmlFor="vol-to" className="text-xs text-muted-foreground">
              Converter para
            </Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger id="vol-to" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((u) => (
                  <SelectItem key={u.value} value={u.value}>
                    {u.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleSwap}
            aria-label="Inverter unidades"
            className="mb-0.5 shrink-0"
          >
            <ArrowLeftRight className="size-4" />
          </Button>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Resultado</Label>
            <div className="flex items-center gap-2 rounded-md border border-brand/30 bg-brand-muted/30 px-3 py-2">
              <ArrowRight className="size-4 shrink-0 text-brand" />
              <span className="text-lg font-bold tabular-nums text-brand sm:text-xl">
                {primary}
              </span>
            </div>
          </div>

          <div className="hidden sm:block" />
        </div>
      </div>

      {/* Todas as equivalências */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Equivalências para todas as unidades
        </h3>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((u) => {
            const isOrigin = u.value === from
            const v = all ? fmt(all[u.value]) : "—"
            return (
              <div
                key={u.value}
                className={cn(
                  "rounded-lg border border-border/60 bg-card px-3 py-2.5 transition-colors",
                  isOrigin && "border-brand/40 bg-brand-muted/30"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-xs text-muted-foreground">{u.label}</span>
                  {isOrigin && (
                    <span className="shrink-0 rounded-full bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand">
                      Origem
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    "mt-1 truncate text-base font-semibold tabular-nums",
                    isOrigin && "text-brand"
                  )}
                  title={v}
                >
                  {v}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
