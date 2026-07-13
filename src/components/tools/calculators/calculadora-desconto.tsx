"use client"

import * as React from "react"
import { Tag, Receipt } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatBRL, parseNumber } from "@/lib/format"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

export default function DiscountCalculator() {
  const [precoOriginal, setPrecoOriginal] = React.useState("")
  const [percentualDesconto, setPercentualDesconto] = React.useState("")

  const original = safeNum(parseNumber(precoOriginal))
  const p = safeNum(parseNumber(percentualDesconto))

  const desconto = original * (p / 100)
  const final = Math.max(0, original - desconto)

  const vazio = original === 0 && p === 0

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="desc-original">Preço original</Label>
          <Input
            id="desc-original"
            inputMode="decimal"
            placeholder="R$ 0,00"
            value={precoOriginal}
            onChange={(e) => setPrecoOriginal(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="desc-percentual">Desconto (%)</Label>
          <Input
            id="desc-percentual"
            inputMode="decimal"
            placeholder="0,00"
            value={percentualDesconto}
            onChange={(e) => setPercentualDesconto(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard
          label="Você economiza"
          value={vazio ? "—" : formatBRL(desconto)}
          icon={Tag}
        />
        <ResultCard
          label="Preço final"
          value={vazio ? "—" : formatBRL(final)}
          icon={Receipt}
          prominent
        />
      </div>
    </div>
  )
}
