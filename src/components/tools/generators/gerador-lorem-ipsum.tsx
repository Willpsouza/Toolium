"use client"

import * as React from "react"
import { Copy, Check, RefreshCw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "nemo", "ipsam",
  "voluptas", "aspernatur", "aut", "odit", "fugit", "quia", "consequuntur",
  "magni", "dolores", "eos", "ratione", "sequi", "nesciunt", "neque", "porro",
  "quisquam", " adipisci", "numquam", "eius", "modi", "tempora", "incidunt",
  "magnam", "quaerat", "voluptatem", "quia", "consequuntur", "nesciunt", "porro",
]

const CLASSIC_START = "Lorem ipsum dolor sit amet, consectetur adipiscing elit"

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)].trim()
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function buildSentence(): string {
  const length = rand(8, 15)
  const words: string[] = []
  for (let i = 0; i < length; i++) {
    let w = pickWord()
    // light comma sprinkle
    if (i > 0 && i < length - 1 && Math.random() < 0.12) w = w + ","
    words.push(w)
  }
  return capitalize(words.join(" ")) + "."
}

function buildParagraph(): string {
  const sentences = rand(3, 6)
  const parts: string[] = []
  for (let i = 0; i < sentences; i++) parts.push(buildSentence())
  return parts.join(" ")
}

type Unit = "paragraphs" | "sentences" | "words"

function generate(unit: Unit, count: number): string {
  if (count <= 0) return ""
  if (unit === "paragraphs") {
    const paras: string[] = []
    for (let i = 0; i < count; i++) paras.push(buildParagraph())
    // Ensure the very first paragraph opens with the classic line.
    paras[0] = CLASSIC_START + ". " + capitalize(buildSentence().toLowerCase())
    return paras.join("\n\n")
  }
  if (unit === "sentences") {
    const parts: string[] = []
    for (let i = 0; i < count; i++) parts.push(buildSentence())
    parts[0] = CLASSIC_START + "."
    return parts.join(" ")
  }
  // words
  const words: string[] = []
  words.push("Lorem", "ipsum", "dolor", "sit", "amet")
  for (let i = 5; i < count; i++) words.push(pickWord())
  return words.slice(0, count).join(" ")
}

export default function GeradorLoremIpsum() {
  const [unit, setUnit] = React.useState<Unit>("paragraphs")
  const [count, setCount] = React.useState(5)
  const [output, setOutput] = React.useState("")
  const [copied, setCopied] = React.useState(false)

  const regenerate = React.useCallback(() => {
    const safeCount = Math.max(1, Math.min(100, count))
    setOutput(generate(unit, safeCount))
    setCopied(false)
  }, [unit, count])

  // Auto-generate on first mount.
  React.useEffect(() => {
    regenerate()
     
  }, [])

  async function copy() {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="lorem-unit">Tipo de unidade</Label>
          <Select value={unit} onValueChange={(v) => setUnit(v as Unit)}>
            <SelectTrigger id="lorem-unit" className="w-full">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraphs">Parágrafos</SelectItem>
              <SelectItem value="sentences">Frases</SelectItem>
              <SelectItem value="words">Palavras</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lorem-count">Quantidade (1–100)</Label>
          <Input
            id="lorem-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => {
              const v = Number(e.target.value)
              setCount(Number.isFinite(v) ? v : 1)
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={regenerate} className="bg-brand text-brand-foreground hover:bg-brand/90">
          <RefreshCw className="size-4" />
          Gerar texto
        </Button>
        <Button variant="outline" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </div>

      <div
        className={cn(
          "max-h-96 overflow-y-auto rounded-lg border bg-muted/40 p-4",
          "text-sm leading-relaxed text-foreground"
        )}
        aria-live="polite"
      >
        {output ? (
          <div className="whitespace-pre-wrap font-serif">
            {output}
          </div>
        ) : (
          <span className="text-muted-foreground">
            Clique em “Gerar texto” para criar o conteúdo Lorem Ipsum.
          </span>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {output ? `${output.split(/\s+/).filter(Boolean).length} palavras geradas` : ""}
      </p>
    </div>
  )
}
