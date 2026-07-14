"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Eraser, Type } from "lucide-react"

type Stat = {
  label: string
  value: string
  hint?: string
}

function calcStats(text: string) {
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, "").length
  const words = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length
  const sentences =
    text.trim().length === 0 ? 0 : text.split(/[.!?…]+/).filter((s) => s.trim().length > 0).length
  const paragraphs =
    text.trim().length === 0
      ? 0
      : text
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter((p) => p.length > 0).length

  const readingSeconds = Math.round((words / 200) * 60)
  const minutes = Math.floor(readingSeconds / 60)
  const seconds = readingSeconds % 60
  const readingTime =
    words === 0
      ? "0 seg"
      : minutes > 0
        ? `${minutes} min ${seconds > 0 ? `${seconds} seg` : ""}`.trim()
        : `${seconds} seg`

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTime,
  }
}

export default function ContadorPalavras() {
  const [text, setText] = useState("")

  const stats = useMemo(() => calcStats(text), [text])

  const statCards: Stat[] = [
    { label: "Palavras", value: stats.words.toLocaleString("pt-BR") },
    { label: "Caracteres", value: stats.characters.toLocaleString("pt-BR") },
    {
      label: "Caracteres sem espaços",
      value: stats.charactersNoSpaces.toLocaleString("pt-BR"),
    },
    { label: "Frases", value: stats.sentences.toLocaleString("pt-BR") },
    { label: "Parágrafos", value: stats.paragraphs.toLocaleString("pt-BR") },
    {
      label: "Tempo de leitura",
      value: stats.readingTime,
      hint: "200 ppm",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite ou cole o seu texto aqui para ver as estatísticas em tempo real..."
          className="min-h-[220px] resize-y text-base leading-relaxed"
          aria-label="Texto para análise"
        />
        {text.length > 0 && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setText("")}
            className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
            aria-label="Limpar texto"
          >
            <Eraser className="mr-1.5 h-4 w-4" />
            Limpar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {statCards.map((stat) => (
          <Card
            key={stat.label}
            className="overflow-hidden border-border/60 bg-muted/10"
          >
            <CardContent className="flex flex-col gap-1 p-4">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </span>
              <span className="text-2xl font-semibold tabular-nums text-foreground">
                {stat.value}
              </span>
              {stat.hint && (
                <span className="text-[10px] text-muted-foreground">
                  {stat.hint}
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/20 p-4 text-sm text-muted-foreground">
        <Type className="h-4 w-4 shrink-0" />
        <span>
          As estatísticas são calculadas instantaneamente no seu navegador, sem
          enviar dados para servidores. O tempo de leitura considera uma
          velocidade média de 200 palavras por minuto.
        </span>
      </div>
    </div>
  )
}
