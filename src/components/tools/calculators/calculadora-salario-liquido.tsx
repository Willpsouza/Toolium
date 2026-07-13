"use client"

import * as React from "react"
import { AlertCircle, Baby, Wallet, ReceiptText } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatBRL, parseNumber } from "@/lib/format"

/**
 * Faixas do INSS para 2024 (progressiva, com teto).
 * Calcula-se o desconto sobre cada faixa; acima de R$ 7.786,02 o
 * desconto é o teto (soma das faixas cheias).
 */
const FAIXAS_INSS = [
  { min: 0, max: 1412.0, aliquota: 0.075 },
  { min: 1412.0, max: 2666.68, aliquota: 0.09 },
  { min: 2666.68, max: 4000.03, aliquota: 0.12 },
  { min: 4000.03, max: 7786.02, aliquota: 0.14 },
]

/** Desconto máximo do INSS (teto) — soma das faixas cheias. */
const TETO_INSS = FAIXAS_INSS.reduce(
  (acc, f) => acc + (f.max - f.min) * f.aliquota,
  0
)

/** Calcula o desconto de INSS progressivo, respeitando o teto. */
export function calcularINSS(salario: number): number {
  if (!Number.isFinite(salario) || salario <= 0) return 0
  let desconto = 0
  for (const faixa of FAIXAS_INSS) {
    if (salario > faixa.min) {
      const baseFaixa = Math.min(salario, faixa.max) - faixa.min
      desconto += baseFaixa * faixa.aliquota
    } else {
      break
    }
  }
  return Math.min(desconto, TETO_INSS)
}

/** Faixas do IRRF mensal para 2024 (alíquota + parcela a deduzir). */
const FAIXAS_IRRF = [
  { max: 2259.2, aliquota: 0, deduzir: 0 },
  { max: 2826.65, aliquota: 0.075, deduzir: 169.44 },
  { max: 3751.05, aliquota: 0.15, deduzir: 381.44 },
  { max: 4664.68, aliquota: 0.225, deduzir: 662.77 },
  { max: Number.POSITIVE_INFINITY, aliquota: 0.275, deduzir: 896.0 },
]

/** Valor por dependente deduzido da base do IRRF (2024). */
const DEDUCAO_DEPENDENTE = 189.59

/** Calcula o IRRF mensal a partir da base de cálculo. */
export function calcularIRRF(base: number): number {
  if (!Number.isFinite(base) || base <= 0) return 0
  for (const faixa of FAIXAS_IRRF) {
    if (base <= faixa.max) {
      const imposto = base * faixa.aliquota - faixa.deduzir
      return Math.max(0, imposto)
    }
  }
  return 0
}

interface Resultado {
  bruto: number
  inss: number
  irrf: number
  liquido: number
  baseIRRF: number
}

function calcularSalarioLiquido(salario: number, dependentes: number): Resultado {
  const inss = calcularINSS(salario)
  const baseIRRF = Math.max(0, salario - inss - dependentes * DEDUCAO_DEPENDENTE)
  const irrf = calcularIRRF(baseIRRF)
  const liquido = salario - inss - irrf
  return { bruto: salario, inss, irrf, liquido, baseIRRF }
}

function LinhaResultado({
  icon: Icon,
  label,
  value,
  destaque = false,
  negativo = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  destaque?: boolean
  negativo?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="flex items-center gap-2.5 text-sm">
        <span
          className={
            destaque
              ? "flex size-8 items-center justify-center rounded-md bg-brand text-brand-foreground"
              : "flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground"
          }
        >
          <Icon className="size-4" />
        </span>
        <span className={destaque ? "font-semibold" : "text-muted-foreground"}>{label}</span>
      </div>
      <span
        className={
          destaque
            ? "text-xl font-bold tabular-nums text-brand"
            : negativo
              ? "text-base font-semibold tabular-nums text-foreground"
              : "text-base font-medium tabular-nums text-foreground"
        }
      >
        {value}
      </span>
    </div>
  )
}

export default function CalculadoraSalarioLiquido() {
  const [brutoStr, setBrutoStr] = React.useState("")
  const [dependentesStr, setDependentesStr] = React.useState("0")

  const bruto = parseNumber(brutoStr)
  const dependentes = Math.max(0, Math.floor(parseNumber(dependentesStr) || 0))

  const valido = brutoStr.trim() !== "" && Number.isFinite(bruto) && bruto >= 0

  const resultado = valido ? calcularSalarioLiquido(bruto, dependentes) : null

  return (
    <div className="flex flex-col gap-6">
      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sl-bruto" className="text-sm font-medium">
            Salário bruto mensal
          </Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              R$
            </span>
            <Input
              id="sl-bruto"
              inputMode="decimal"
              value={brutoStr}
              onChange={(e) => setBrutoStr(e.target.value)}
              placeholder="0,00"
              aria-label="Salário bruto mensal em reais"
              className="h-11 pl-9 text-base tabular-nums"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sl-dependentes" className="text-sm font-medium">
            Número de dependentes
          </Label>
          <div className="relative">
            <Baby className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="sl-dependentes"
              inputMode="numeric"
              value={dependentesStr}
              onChange={(e) => setDependentesStr(e.target.value.replace(/[^\d]/g, ""))}
              placeholder="0"
              aria-label="Número de dependentes"
              className="h-11 pl-9 text-base tabular-nums"
            />
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <Card className="gap-0 px-6 py-2">
        <LinhaResultado
          icon={Wallet}
          label="Salário bruto"
          value={resultado ? formatBRL(resultado.bruto) : "—"}
        />
        <Separator />
        <LinhaResultado
          icon={ReceiptText}
          label="Desconto INSS"
          value={resultado ? `− ${formatBRL(resultado.inss)}` : "—"}
          negativo
        />
        <Separator />
        <LinhaResultado
          icon={ReceiptText}
          label="Desconto IRRF"
          value={resultado ? `− ${formatBRL(resultado.irrf)}` : "—"}
          negativo
        />
        <Separator />
        <LinhaResultado
          icon={Wallet}
          label="Salário líquido"
          value={resultado ? formatBRL(resultado.liquido) : "—"}
          destaque
        />
      </Card>

      {/* Detalhes adicionais */}
      {resultado && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border bg-muted/30 px-4 py-3">
            <p className="text-xs text-muted-foreground">Base IRRF</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums">{formatBRL(resultado.baseIRRF)}</p>
          </div>
          <div className="rounded-lg border bg-muted/30 px-4 py-3">
            <p className="text-xs text-muted-foreground">Alíquota efetiva INSS</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums">
              {resultado.bruto > 0
                ? `${(resultado.inss / resultado.bruto * 100).toLocaleString("pt-BR", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 2,
                  })}%`
                : "—"}
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 px-4 py-3">
            <p className="text-xs text-muted-foreground">Dependentes</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums">{dependentes}</p>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-xs text-muted-foreground">
        <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-600" />
        <span>
          Valores estimados para fins de planejamento. A base de cálculo do IRRF considera a dedução de{" "}
          <strong>R$ {DEDUCAO_DEPENDENTE.toFixed(2).replace(".", ",")}</strong> por dependente. Não inclui
          descontos de FGTS, vale-transporte ou plano de saúde.
        </span>
      </div>
    </div>
  )
}
