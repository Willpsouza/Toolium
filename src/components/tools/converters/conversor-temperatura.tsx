"use client"

import * as React from "react"
import { Thermometer } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { formatNumber, parseNumber } from "@/lib/format"

type Unit = "c" | "f" | "k"

const units: { value: Unit; label: string; symbol: string }[] = [
  { value: "c", label: "Celsius", symbol: "°C" },
  { value: "f", label: "Fahrenheit", symbol: "°F" },
  { value: "k", label: "Kelvin", symbol: "K" },
]

/** Converte um valor de temperatura da unidade `from` para todas as três. */
function convertTemperature(value: number, from: Unit): Record<Unit, number> {
  // Primeiro converte para Celsius como base intermediária.
  let celsius: number
  if (from === "c") celsius = value
  else if (from === "f") celsius = (value - 32) * (5 / 9)
  else celsius = value - 273.15 // kelvin -> celsius

  return {
    c: celsius,
    f: celsius * (9 / 5) + 32,
    k: celsius + 273.15,
  }
}

function fmt(value: number): string {
  if (!Number.isFinite(value)) return "—"
  return formatNumber(value, { minimumFractionDigits: 2, maximumFractionDigits: 4 })
}

export default function TemperatureConverter() {
  const [raw, setRaw] = React.useState("100")
  const [from, setFrom] = React.useState<Unit>("c")

  const value = parseNumber(raw)
  const hasValue = Number.isFinite(value)
  const results = hasValue ? convertTemperature(value, from) : null

  return (
    <div className="space-y-6">
      {/* Entrada */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="temp-value">Temperatura</Label>
          <Input
            id="temp-value"
            inputMode="decimal"
            placeholder="Ex.: 100"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            aria-describedby="temp-value-help"
          />
          <p id="temp-value-help" className="text-xs text-muted-foreground">
            Digite o valor que deseja converter.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="temp-unit">Unidade de origem</Label>
          <Select value={from} onValueChange={(v) => setFrom(v as Unit)}>
            <SelectTrigger id="temp-unit" className="w-full">
              <SelectValue placeholder="Selecione a unidade" />
            </SelectTrigger>
            <SelectContent>
              {units.map((u) => (
                <SelectItem key={u.value} value={u.value}>
                  {u.label} ({u.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Resultados em cartões */}
      <div>
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Thermometer className="size-4 text-brand" />
          Resultado da conversão
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {units.map((u) => {
            const isOrigin = u.value === from
            const display = results ? fmt(results[u.value]) : "—"
            return (
              <Card
                key={u.value}
                className={cn(
                  "overflow-hidden border-border/70 transition-colors",
                  isOrigin && "border-brand/40 bg-brand-muted/30"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {u.label}
                    </span>
                    <span className="text-xs font-semibold text-brand">{u.symbol}</span>
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-2xl font-bold tracking-tight tabular-nums",
                      isOrigin && "text-brand"
                    )}
                  >
                    {display}
                  </p>
                  {isOrigin && (
                    <p className="mt-1 text-xs text-muted-foreground">Unidade de origem</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Fórmulas de referência */}
      <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Fórmulas utilizadas
        </p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Celsius → Fahrenheit:</span> °F = °C × 9/5 + 32
          </li>
          <li>
            <span className="font-medium text-foreground">Celsius → Kelvin:</span> K = °C + 273,15
          </li>
          <li>
            <span className="font-medium text-foreground">Fahrenheit → Celsius:</span> °C = (°F − 32) × 5/9
          </li>
          <li>
            <span className="font-medium text-foreground">Kelvin → Celsius:</span> °C = K − 273,15
          </li>
        </ul>
      </div>
    </div>
  )
}
