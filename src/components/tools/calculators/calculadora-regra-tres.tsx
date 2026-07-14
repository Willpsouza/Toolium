"use client"

import * as React from "react"
import { ArrowLeftRight, Equal, Scale } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { formatNumber, parseNumber } from "@/lib/format"

type TipoRegra = "direta" | "inversa"

interface FaixaInputProps {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  ariaLabel: string
}

function CampoProporcao({ id, label, value, onChange, placeholder, ariaLabel }: FaixaInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="h-11 text-center text-lg font-semibold tabular-nums"
      />
    </div>
  )
}

function calcularRegraTres(a: number, b: number, c: number, tipo: TipoRegra): number {
  if (tipo === "direta") {
    // X = (B * C) / A
    if (a === 0) return NaN
    return (b * c) / a
  }
  // inversa: X = (A * C) / B
  if (b === 0) return NaN
  return (a * c) / b
}

export default function CalculadoraRegraTres() {
  const [a, setA] = React.useState("")
  const [b, setB] = React.useState("")
  const [c, setC] = React.useState("")
  const [tipo, setTipo] = React.useState<TipoRegra>("direta")

  const numA = parseNumber(a)
  const numB = parseNumber(b)
  const numC = parseNumber(c)

  const todosPreenchidos =
    a.trim() !== "" && b.trim() !== "" && c.trim() !== "" &&
    Number.isFinite(numA) && Number.isFinite(numB) && Number.isFinite(numC)

  const x = todosPreenchidos ? calcularRegraTres(numA, numB, numC, tipo) : NaN

  const xFormatado = Number.isFinite(x) ? formatNumber(x, { minimumFractionDigits: 0, maximumFractionDigits: 4 }) : "—"

  function limpar() {
    setA("")
    setB("")
    setC("")
    setTipo("direta")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Tipo de regra de três */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium">Tipo de regra de três</Label>
        <div className="grid grid-cols-2 gap-2 sm:inline-grid">
          <button
            type="button"
            onClick={() => setTipo("direta")}
            aria-pressed={tipo === "direta"}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
              tipo === "direta"
                ? "border-brand bg-brand text-brand-foreground shadow-sm"
                : "border-border bg-background hover:bg-muted"
            )}
          >
            <Scale className="size-4" />
            Direta
          </button>
          <button
            type="button"
            onClick={() => setTipo("inversa")}
            aria-pressed={tipo === "inversa"}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
              tipo === "inversa"
                ? "border-brand bg-brand text-brand-foreground shadow-sm"
                : "border-border bg-background hover:bg-muted"
            )}
          >
            <ArrowLeftRight className="size-4" />
            Inversa
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          {tipo === "direta"
            ? "Direta: as grandezas variam no mesmo sentido (mais de A, mais de B)."
            : "Inversa: as grandezas variam em sentidos opostos (mais de A, menos de B)."}
        </p>
      </div>

      <Separator />

      {/* Proporção visual */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 sm:gap-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <CampoProporcao id="rt-a" label="A" value={a} onChange={setA} placeholder="0" ariaLabel="Valor de A" />
          <CampoProporcao id="rt-b" label="B" value={b} onChange={setB} placeholder="0" ariaLabel="Valor de B" />
        </div>
        <div className="pb-3 text-center text-xl font-light text-muted-foreground">::</div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <CampoProporcao id="rt-c" label="C" value={c} onChange={setC} placeholder="0" ariaLabel="Valor de C" />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="rt-x" className="text-xs font-medium text-muted-foreground">
              X
            </Label>
            <div
              id="rt-x"
              className="flex h-11 items-center justify-center rounded-md border border-brand/40 bg-brand-muted px-3 text-center text-lg font-bold tabular-nums text-brand"
              aria-live="polite"
            >
              {xFormatado}
            </div>
          </div>
        </div>
      </div>

      {/* Resultado destacado */}
      <Card className="bg-brand-muted border-brand/30 gap-3 px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Equal className="size-4 text-brand" />
            Valor de X
          </div>
          <div className="text-3xl font-bold tabular-nums text-brand sm:text-4xl" aria-live="polite">
            {xFormatado}
          </div>
        </div>
        {todosPreenchidos && Number.isFinite(x) && (
          <p className="text-sm text-muted-foreground">
            {tipo === "direta" ? (
              <span>
                Se <strong>A</strong> é para <strong>B</strong>, então <strong>C</strong> é para{" "}
                <strong className="text-brand">{xFormatado}</strong>.
              </span>
            ) : (
              <span>
                Na proporção inversa, <strong>X</strong> = <strong className="text-brand">{xFormatado}</strong>.
              </span>
            )}
          </p>
        )}
        {!todosPreenchidos && (
          <p className="text-sm text-muted-foreground">
            Preencha os valores de A, B e C para calcular o valor de X automaticamente.
          </p>
        )}
      </Card>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={limpar}>
          Limpar
        </Button>
      </div>
    </div>
  )
}
