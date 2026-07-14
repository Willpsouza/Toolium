"use client"

import * as React from "react"
import { Copy, RefreshCw, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

const LOWER = "abcdefghijklmnopqrstuvwxyz"
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const NUMBERS = "0123456789"
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?/"

type CharSet = {
  key: "lower" | "upper" | "numbers" | "symbols"
  label: string
  value: string
}

const SETS: CharSet[] = [
  { key: "lower", label: "Minúsculas (a-z)", value: LOWER },
  { key: "upper", label: "Maiúsculas (A-Z)", value: UPPER },
  { key: "numbers", label: "Números (0-9)", value: NUMBERS },
  { key: "symbols", label: "Símbolos (!@#$...)", value: SYMBOLS },
]

function secureRandomInt(max: number): number {
  // Rejection sampling for uniform distribution.
  const limit = Math.floor(0xffffffff / max) * max
  const arr = new Uint32Array(1)
  let x = 0
  do {
    crypto.getRandomValues(arr)
    x = arr[0]
  } while (x >= limit)
  return x % max
}

function generatePassword(length: number, enabledSets: string[]): string {
  const pools = SETS.filter((s) => enabledSets.includes(s.key)).map((s) => s.value)
  if (pools.length === 0) return ""
  const fullPool = pools.join("")
  const chars: string[] = []
  // Guarantee at least one char from each enabled pool.
  for (const pool of pools) {
    chars.push(pool[secureRandomInt(pool.length)])
  }
  while (chars.length < length) {
    chars.push(fullPool[secureRandomInt(fullPool.length)])
  }
  // Shuffle (Fisher-Yates) using secure RNG.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }
  return chars.slice(0, length).join("")
}

type Strength = {
  label: string
  color: string
  score: number // 0..4
}

function calcStrength(length: number, enabledCount: number): Strength {
  let score = 0
  if (length >= 8) score++
  if (length >= 12) score++
  if (length >= 16) score++
  if (enabledCount >= 3) score++
  if (length >= 24 && enabledCount === 4) score = 4
  if (enabledCount === 1) score = Math.min(score, 1)
  const map: Record<number, Strength> = {
    0: { label: "Fraca", color: "bg-red-500 text-white", score: 0 },
    1: { label: "Fraca", color: "bg-red-500 text-white", score: 1 },
    2: { label: "Média", color: "bg-amber-500 text-white", score: 2 },
    3: { label: "Forte", color: "bg-emerald-500 text-white", score: 3 },
    4: { label: "Muito forte", color: "bg-brand text-brand-foreground", score: 4 },
  }
  return map[score] ?? map[0]
}

export default function GeradorSenhas() {
  const [length, setLength] = React.useState(16)
  const [enabled, setEnabled] = React.useState<Record<string, boolean>>({
    lower: true,
    upper: true,
    numbers: true,
    symbols: true,
  })
  const [password, setPassword] = React.useState("")
  const [copied, setCopied] = React.useState(false)

  const enabledKeys = React.useMemo(
    () => Object.keys(enabled).filter((k) => enabled[k]),
    [enabled]
  )

  const regenerate = React.useCallback(() => {
    if (enabledKeys.length === 0) {
      setPassword("")
      return
    }
    setPassword(generatePassword(length, enabledKeys))
    setCopied(false)
  }, [length, enabledKeys])

  // Auto-generate on first mount.
  React.useEffect(() => {
    regenerate()
     
  }, [])

  const strength = calcStrength(length, enabledKeys.length)

  async function copy() {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore
    }
  }

  function toggle(key: string, checked: boolean) {
    setEnabled((prev) => ({ ...prev, [key]: checked }))
  }

  return (
    <div className="space-y-6">
      {/* Display */}
      <div className="space-y-3">
        <div className="relative">
          <div
            className="flex min-h-16 w-full items-center break-all rounded-lg border bg-muted/40 p-4 font-mono text-lg tracking-wide text-foreground"
            aria-live="polite"
            aria-label="Senha gerada"
          >
            {password || <span className="text-muted-foreground">Selecione ao menos uma opção e gere uma senha.</span>}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={regenerate} className="bg-brand text-brand-foreground hover:bg-brand/90" disabled={enabledKeys.length === 0}>
            <RefreshCw className="size-4" />
            Gerar senha
          </Button>
          <Button variant="outline" onClick={copy} disabled={!password}>
            {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
            {copied ? "Copiada" : "Copiar"}
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Força:</span>
            <Badge className={cn("px-2 py-0.5", strength.color)}>{strength.label}</Badge>
            <div className="flex h-1.5 w-28 overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full transition-all", strength.color.split(" ")[0])}
                style={{ width: `${((strength.score + 1) / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Length */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="length">Tamanho da senha</Label>
          <span className="font-mono text-sm font-medium text-brand">{length} caracteres</span>
        </div>
        <Slider
          id="length"
          min={4}
          max={64}
          step={1}
          value={[length]}
          onValueChange={(v) => setLength(v[0] ?? 16)}
          aria-label="Tamanho da senha"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>4</span>
          <span>64</span>
        </div>
      </div>

      {/* Options */}
      <div className="grid gap-3 sm:grid-cols-2">
        {SETS.map((s) => (
          <div
            key={s.key}
            className="flex items-center justify-between rounded-lg border bg-card p-3"
          >
            <Label htmlFor={`opt-${s.key}`} className="cursor-pointer text-sm">
              {s.label}
            </Label>
            <Switch
              id={`opt-${s.key}`}
              checked={enabled[s.key]}
              onCheckedChange={(c) => toggle(s.key, c)}
              aria-label={s.label}
            />
          </div>
        ))}
      </div>

      {enabledKeys.length === 0 && (
        <p className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          Selecione ao menos um tipo de caractere para gerar a senha.
        </p>
      )}
    </div>
  )
}
