"use client"

import * as React from "react"
import { Copy, Check, RefreshCw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type HSL = { h: number; s: number; l: number }
type RGB = { r: number; g: number; b: number }

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

function hslToRgb({ h, s, l }: HSL): RGB {
  const hh = ((h % 360) + 360) % 360
  const ss = clamp(s, 0, 100) / 100
  const ll = clamp(l, 0, 100) / 100
  const c = (1 - Math.abs(2 * ll - 1)) * ss
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1))
  const m = ll - c / 2
  let r = 0, g = 0, b = 0
  if (hh < 60) { r = c; g = x; b = 0 }
  else if (hh < 120) { r = x; g = c; b = 0 }
  else if (hh < 180) { r = 0; g = c; b = x }
  else if (hh < 240) { r = 0; g = x; b = c }
  else if (hh < 300) { r = x; g = 0; b = c }
  else { r = c; g = 0; b = x }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  }
}

function rgbToHex({ r, g, b }: RGB): string {
  const to = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0")
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase()
}

function hslToCss({ h, s, l }: HSL): string {
  return `hsl(${Math.round(h)}, ${Math.round(clamp(s, 0, 100))}%, ${Math.round(clamp(l, 0, 100))}%)`
}

function rgbToCss({ r, g, b }: RGB): string {
  return `rgb(${r}, ${g}, ${b})`
}

function randomHsl(): HSL {
  return {
    h: Math.floor(Math.random() * 360),
    s: 55 + Math.floor(Math.random() * 35), // 55..90
    l: 40 + Math.floor(Math.random() * 25), // 40..65
  }
}

// Build a palette of 5: 2 lighter, base, 2 darker (varying lightness only).
function buildPalette(base: HSL): HSL[] {
  return [
    { ...base, l: clamp(base.l - 28, 5, 95) },
    { ...base, l: clamp(base.l - 14, 5, 95) },
    { ...base },
    { ...base, l: clamp(base.l + 14, 5, 95) },
    { ...base, l: clamp(base.l + 28, 5, 95) },
  ]
}

function contrastColor(hsl: HSL): string {
  // Use luminance approximation based on lightness.
  return hsl.l > 55 ? "#0f172a" : "#ffffff"
}

export default function GeradorCores() {
  const [color, setColor] = React.useState<HSL>({ h: 158, s: 84, l: 36 })
  const [copied, setCopied] = React.useState<string | null>(null)

  const palette = React.useMemo(() => buildPalette(color), [color])
  const rgb = React.useMemo(() => hslToRgb(color), [color])
  const hex = React.useMemo(() => rgbToHex(rgb), [rgb])
  const rgbCss = rgbToCss(rgb)
  const hslCss = hslToCss(color)

  const codes = React.useMemo(
    () => [
      { key: "HEX", value: hex },
      { key: "RGB", value: rgbCss },
      { key: "HSL", value: hslCss },
    ],
    [hex, rgbCss, hslCss]
  )

  async function copy(key: string, value: string) {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      setTimeout(() => setCopied(null), 1800)
    } catch {
      // ignore
    }
  }

  return (
    <div className="space-y-6">
      {/* Big swatch */}
      <div
        className="relative flex min-h-44 w-full flex-col items-center justify-center rounded-xl border shadow-sm transition-colors"
        style={{ backgroundColor: hex, color: contrastColor(color) }}
      >
        <span className="text-xs uppercase tracking-widest opacity-80">Cor ativa</span>
        <span className="font-mono text-2xl font-semibold sm:text-3xl">{hex}</span>
        <span className="mt-1 font-mono text-xs opacity-80">{rgbCss} · {hslCss}</span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => setColor(randomHsl())}
          className="bg-brand text-brand-foreground hover:bg-brand/90"
        >
          <RefreshCw className="size-4" />
          Gerar cor
        </Button>
      </div>

      {/* Codes */}
      <div className="grid gap-3 sm:grid-cols-3">
        {codes.map((c) => (
          <div
            key={c.key}
            className="flex items-center justify-between gap-2 rounded-lg border bg-card p-3"
          >
            <div className="min-w-0">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {c.key}
              </div>
              <div className="truncate font-mono text-sm text-foreground" title={c.value}>
                {c.value}
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="size-9 shrink-0"
              onClick={() => copy(c.key, c.value)}
              aria-label={`Copiar valor ${c.key}`}
            >
              {copied === c.key ? (
                <Check className="size-4 text-emerald-500" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>
        ))}
      </div>

      {/* Palette */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-foreground">Variações</div>
        <p className="text-xs text-muted-foreground">
          Clique em uma variação para defini-la como a cor ativa.
        </p>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {palette.map((p, idx) => {
            const pHex = rgbToHex(hslToRgb(p))
            const isActive = idx === 2 && p.l === color.l && p.h === color.h && p.s === color.s
            return (
              <button
                key={`${pHex}-${idx}`}
                type="button"
                onClick={() => setColor(p)}
                className={cn(
                  "group flex aspect-square flex-col items-center justify-end rounded-lg border p-2 text-center transition-all hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive && "ring-2 ring-ring ring-offset-2"
                )}
                style={{ backgroundColor: pHex, color: contrastColor(p) }}
                aria-label={`Selecionar cor ${pHex}`}
                aria-pressed={isActive}
              >
                <span className="rounded bg-black/20 px-1.5 py-0.5 font-mono text-[10px] leading-none backdrop-blur-sm">
                  {pHex}
                </span>
              </button>
            )
          })}
        </div>
        <div className="flex justify-between px-1 text-[10px] uppercase tracking-wide text-muted-foreground">
          <span>Mais escura</span>
          <span>Base</span>
          <span>Mais clara</span>
        </div>
      </div>
    </div>
  )
}
