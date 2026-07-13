"use client"

import * as React from "react"
import { Activity, Ruler, Weight } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { formatNumber, parseNumber } from "@/lib/format"

interface CategoriaIMC {
  label: string
  min: number
  max: number
  badge: string
}

const CATEGORIAS: CategoriaIMC[] = [
  { label: "Abaixo do peso", min: 0, max: 18.5, badge: "bg-amber-500/15 text-amber-700 border-amber-500/30" },
  { label: "Peso normal", min: 18.5, max: 25, badge: "bg-brand-muted text-brand border-brand/30" },
  { label: "Sobrepeso", min: 25, max: 30, badge: "bg-amber-500/15 text-amber-700 border-amber-500/30" },
  { label: "Obesidade", min: 30, max: Infinity, badge: "bg-rose-500/15 text-rose-700 border-rose-500/30" },
]

function classificar(imc: number): CategoriaIMC {
  for (const cat of CATEGORIAS) {
    if (imc >= cat.min && imc < cat.max) return cat
  }
  return CATEGORIAS[CATEGORIAS.length - 1]
}

export default function CalculadoraIMC() {
  const [pesoStr, setPesoStr] = React.useState("")
  const [alturaStr, setAlturaStr] = React.useState("")

  const peso = parseNumber(pesoStr)
  const altura = parseNumber(alturaStr)

  const valido =
    pesoStr.trim() !== "" &&
    alturaStr.trim() !== "" &&
    Number.isFinite(peso) &&
    Number.isFinite(altura) &&
    peso > 0 &&
    altura > 0

  const imc = valido ? peso / (altura * altura) : NaN
  const categoria = Number.isFinite(imc) ? classificar(imc) : null

  // Posição relativa no medidor (limitado entre 15 e 40)
  const posicaoMedidor = Number.isFinite(imc) ? Math.min(100, Math.max(0, ((imc - 15) / (40 - 15)) * 100)) : 0

  return (
    <div className="flex flex-col gap-6">
      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="imc-peso" className="text-sm font-medium">
            Peso
          </Label>
          <div className="relative">
            <Weight className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="imc-peso"
              inputMode="decimal"
              value={pesoStr}
              onChange={(e) => setPesoStr(e.target.value)}
              placeholder="70,0"
              aria-label="Peso em quilogramas"
              className="h-11 pl-9 text-base tabular-nums"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              kg
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="imc-altura" className="text-sm font-medium">
            Altura
          </Label>
          <div className="relative">
            <Ruler className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="imc-altura"
              inputMode="decimal"
              value={alturaStr}
              onChange={(e) => setAlturaStr(e.target.value)}
              placeholder="1,75"
              aria-label="Altura em metros"
              className="h-11 pl-9 text-base tabular-nums"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              m
            </span>
          </div>
        </div>
      </div>

      {/* Resultado principal */}
      <Card className="bg-brand-muted border-brand/30 gap-3 px-6 py-6">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Activity className="size-4 text-brand" />
          Seu IMC
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="text-5xl font-bold tabular-nums text-brand sm:text-6xl">
            {Number.isFinite(imc) ? formatNumber(imc, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : "—"}
          </div>
          {categoria && (
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold",
                categoria.badge
              )}
            >
              {categoria.label}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          IMC = peso ÷ (altura × altura). O Índice de Massa Corporal é uma referência da Organização
          Mundial da Saúde.
        </p>
      </Card>

      {/* Medidor visual */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs font-medium text-muted-foreground">
          <span>15</span>
          <span>18,5</span>
          <span>25</span>
          <span>30</span>
          <span>40</span>
        </div>
        <div className="relative h-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-500 via-brand to-rose-500">
          {Number.isFinite(imc) && (
            <div
              className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-foreground shadow-md"
              style={{ left: `${posicaoMedidor}%` }}
              aria-hidden="true"
            />
          )}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>Abaixo</span>
          <span>Normal</span>
          <span>Sobrepeso</span>
          <span>Obesidade</span>
        </div>
      </div>

      {/* Tabela de categorias */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {CATEGORIAS.map((cat) => {
          const ativa = categoria?.label === cat.label
          return (
            <div
              key={cat.label}
              className={cn(
                "rounded-lg border px-3 py-2.5 text-center transition-colors",
                ativa ? cn(cat.badge) : "bg-muted/30 border-border"
              )}
            >
              <p className="text-xs font-semibold">{cat.label}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {cat.max === Infinity
                  ? `≥ ${cat.min.toLocaleString("pt-BR")}`
                  : `${cat.min.toLocaleString("pt-BR")} – ${cat.max.toLocaleString("pt-BR")}`}
              </p>
            </div>
          )
        })}
      </div>

      {!valido && (pesoStr || alturaStr) && (
        <p className="text-xs text-amber-600">
          Informe peso e altura válidos (valores positivos) para calcular o IMC.
        </p>
      )}
    </div>
  )
}
