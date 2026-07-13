"use client"

import * as React from "react"
import { CalendarClock, Receipt, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatBRL, parseNumber } from "@/lib/format"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function safeNum(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0
}

interface Parcela {
  n: number
  prestacao: number
  juros: number
  amortizacao: number
  saldo: number
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

export default function FinancingCalculator() {
  const [valorFinanciado, setValorFinanciado] = React.useState("")
  const [taxaJuros, setTaxaJuros] = React.useState("")
  const [numParcelas, setNumParcelas] = React.useState("")

  const principal = safeNum(parseNumber(valorFinanciado))
  const taxa = safeNum(parseNumber(taxaJuros))
  const nRaw = parseNumber(numParcelas)
  const n = Number.isFinite(nRaw) && nRaw > 0 ? Math.floor(nRaw) : 0

  const i = taxa / 100
  const parcela =
    n === 0
      ? 0
      : i === 0
        ? principal / n
        : (principal * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1)

  const totalPago = parcela * n
  const totalJuros = totalPago - principal

  const vazio = principal === 0 && taxa === 0 && n === 0

  // Prévia da amortização — primeiras 12 parcelas
  const parcelas: Parcela[] = React.useMemo(() => {
    if (principal === 0 || n === 0) return []
    const limite = Math.min(12, n)
    const lista: Parcela[] = []
    let saldo = principal
    for (let k = 1; k <= limite; k++) {
      const j = saldo * i
      const a = parcela - j
      saldo = Math.max(0, saldo - a)
      lista.push({
        n: k,
        prestacao: parcela,
        juros: j,
        amortizacao: a,
        saldo,
      })
    }
    return lista
  }, [principal, n, i, parcela])

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="fin-valor">Valor financiado</Label>
          <Input
            id="fin-valor"
            inputMode="decimal"
            placeholder="R$ 0,00"
            value={valorFinanciado}
            onChange={(e) => setValorFinanciado(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="fin-taxa">Taxa de juros (% ao mês)</Label>
          <Input
            id="fin-taxa"
            inputMode="decimal"
            placeholder="0,00"
            value={taxaJuros}
            onChange={(e) => setTaxaJuros(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="fin-parcelas">Número de parcelas</Label>
          <Input
            id="fin-parcelas"
            inputMode="numeric"
            placeholder="0"
            value={numParcelas}
            onChange={(e) => setNumParcelas(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultCard
          label="Valor da parcela"
          value={vazio ? "—" : formatBRL(parcela)}
          icon={CalendarClock}
          prominent
        />
        <ResultCard
          label="Total a pagar"
          value={vazio ? "—" : formatBRL(totalPago)}
          icon={Receipt}
        />
        <ResultCard
          label="Total de juros"
          value={vazio ? "—" : formatBRL(totalJuros)}
          icon={TrendingUp}
        />
      </div>

      {parcelas.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Prévia das {parcelas.length} primeiras parcelas (Tabela Price)
          </h3>
          <div className="max-h-64 overflow-auto scrollbar-thin rounded-xl border border-border">
            <Table>
              <TableHeader className="sticky top-0 bg-muted/80 backdrop-blur">
                <TableRow>
                  <TableHead className="w-16">Parcela</TableHead>
                  <TableHead>Prestação</TableHead>
                  <TableHead>Juros</TableHead>
                  <TableHead>Amortização</TableHead>
                  <TableHead className="text-right">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parcelas.map((p) => (
                  <TableRow key={p.n}>
                    <TableCell className="font-medium tabular-nums">
                      {p.n}
                    </TableCell>
                    <TableCell className="tabular-nums">
                      {formatBRL(p.prestacao)}
                    </TableCell>
                    <TableCell className="tabular-nums text-muted-foreground">
                      {formatBRL(p.juros)}
                    </TableCell>
                    <TableCell className="tabular-nums">
                      {formatBRL(p.amortizacao)}
                    </TableCell>
                    <TableCell className="tabular-nums text-right">
                      {formatBRL(p.saldo)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : null}
    </div>
  )
}
