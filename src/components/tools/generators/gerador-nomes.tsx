"use client"

import * as React from "react"
import { Copy, Check, RefreshCw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FIRST_NAMES = [
  "João", "Pedro", "Lucas", "Mateus", "Bruno", "Gabriel", "Rafael", "Felipe",
  "Thiago", "Ricardo", "Carlos", "Eduardo", "Marcelo", "André", "Vinícius",
  "Rafaela", "Marcos", "Gustavo", "Leonardo", "Henrique", "Rodrigo", "Daniel",
  "Paulo", "Fernando", "Diego", "Roberto", "Sérgio", "Márcio", "Alex", "Igor",
]

const LAST_NAMES = [
  "Silva", "Santos", "Oliveira", "Souza", "Costa", "Pereira", "Almeida",
  "Ferreira", "Rodrigues", "Gomes", "Martins", "Araújo", "Carvalho", "Ribeiro",
  "Lopes", "Barbosa", "Rocha", "Dias", "Monteiro", "Cardoso", "Andrade",
  "Nascimento", "Moreira", "Alves", "Mendes", "Freitas", "Cavalcanti",
  "Pinto", "Teixeira", "Moraes",
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateName(): string {
  // First name + 1 or 2 last names
  const lastCount = Math.random() < 0.6 ? 2 : 1
  const parts = [pick(FIRST_NAMES)]
  for (let i = 0; i < lastCount; i++) parts.push(pick(LAST_NAMES))
  return parts.join(" ")
}

function generateNames(count: number): string[] {
  const set = new Set<string>()
  const out: string[] = []
  let safety = 0
  while (out.length < count && safety < count * 50) {
    const n = generateName()
    if (!set.has(n)) {
      set.add(n)
      out.push(n)
    }
    safety++
  }
  // Fill the rest if collisions kept us short (rare).
  while (out.length < count) out.push(generateName())
  return out
}

export default function GeradorNomes() {
  const [count, setCount] = React.useState(10)
  const [names, setNames] = React.useState<string[]>([])
  const [copiedAll, setCopiedAll] = React.useState(false)
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null)

  const regenerate = React.useCallback(() => {
    const safe = Math.max(1, Math.min(50, count))
    setNames(generateNames(safe))
    setCopiedAll(false)
    setCopiedIdx(null)
  }, [count])

  // Auto-generate on first mount.
  React.useEffect(() => {
    regenerate()
     
  }, [])

  async function copyAll() {
    if (names.length === 0) return
    try {
      await navigator.clipboard.writeText(names.join("\n"))
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 1800)
    } catch {
      // ignore
    }
  }

  async function copyOne(idx: number) {
    const n = names[idx]
    if (!n) return
    try {
      await navigator.clipboard.writeText(n)
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(null), 1800)
    } catch {
      // ignore
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-[160px_1fr] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor="name-count">Quantidade (1–50)</Label>
          <Input
            id="name-count"
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => {
              const v = Number(e.target.value)
              setCount(Number.isFinite(v) ? v : 1)
            }}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={regenerate} className="bg-brand text-brand-foreground hover:bg-brand/90">
            <RefreshCw className="size-4" />
            Gerar nomes
          </Button>
          <Button variant="outline" onClick={copyAll} disabled={names.length === 0}>
            {copiedAll ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
            {copiedAll ? "Copiados" : "Copiar todos"}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "max-h-96 overflow-y-auto rounded-lg border bg-muted/30"
        )}
        aria-live="polite"
      >
        {names.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">
            Clique em “Gerar nomes” para criar a lista.
          </p>
        ) : (
          <ul className="divide-y">
            {names.map((n, i) => (
              <li
                key={`${n}-${i}`}
                className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm"
              >
                <span className="font-medium text-foreground">
                  <span className="mr-2 text-xs font-normal text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {n}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8"
                  onClick={() => copyOne(i)}
                  aria-label={`Copiar nome ${n}`}
                >
                  {copiedIdx === i ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
