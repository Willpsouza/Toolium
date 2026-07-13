"use client"

import * as React from "react"
import SparkMD5 from "spark-md5"
import { Copy, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

async function sha(
  algo: "SHA-1" | "SHA-256" | "SHA-512",
  text: string
): Promise<string> {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text))
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

type HashRow = {
  algo: string
  label: string
  value: string
}

export default function GeradorHash() {
  const [text, setText] = React.useState("")
  const [rows, setRows] = React.useState<HashRow[]>([
    { algo: "MD5", label: "MD5", value: "" },
    { algo: "SHA-1", label: "SHA-1", value: "" },
    { algo: "SHA-256", label: "SHA-256", value: "" },
    { algo: "SHA-512", label: "SHA-512", value: "" },
  ])
  const [copied, setCopied] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    async function run() {
      const empty = !text
      const md5 = empty ? "" : SparkMD5.hash(text)
      const s1 = empty ? "" : await sha("SHA-1", text)
      const s256 = empty ? "" : await sha("SHA-256", text)
      const s512 = empty ? "" : await sha("SHA-512", text)
      if (cancelled) return
      setRows([
        { algo: "MD5", label: "MD5", value: md5 },
        { algo: "SHA-1", label: "SHA-1", value: s1 },
        { algo: "SHA-256", label: "SHA-256", value: s256 },
        { algo: "SHA-512", label: "SHA-512", value: s512 },
      ])
    }
    run()
    return () => {
      cancelled = true
    }
  }, [text])

  async function copyValue(algo: string, value: string) {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(algo)
      setTimeout(() => setCopied(null), 1800)
    } catch {
      // ignore
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="hash-text">Texto de entrada</Label>
        <Textarea
          id="hash-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite ou cole o texto que deseja hashear."
          rows={5}
          className="resize-y font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          {text.length} caractere{text.length === 1 ? "" : "s"} · cálculo em tempo real no navegador.
        </p>
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.algo}
            className="grid grid-cols-[88px_1fr_auto] items-center gap-3 rounded-lg border bg-card p-3"
          >
            <div className="text-sm font-semibold text-foreground">{row.label}</div>
            <code
              className={cn(
                "block max-h-24 overflow-y-auto break-all rounded bg-muted/60 px-3 py-2 text-xs leading-relaxed text-foreground",
                !row.value && "text-muted-foreground"
              )}
            >
              {row.value || "—"}
            </code>
            <Button
              size="icon"
              variant="ghost"
              className="size-9"
              onClick={() => copyValue(row.algo, row.value)}
              disabled={!row.value}
              aria-label={`Copiar hash ${row.label}`}
            >
              {copied === row.algo ? (
                <Check className="size-4 text-emerald-500" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Os hashes são gerados localmente. MD5 e SHA-1 não são recomendados para fins de
        segurança — prefira SHA-256 ou SHA-512.
      </p>
    </div>
  )
}
