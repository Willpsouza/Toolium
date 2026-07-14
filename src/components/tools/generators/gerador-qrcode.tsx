"use client"

import * as React from "react"
import QRCode from "qrcode"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SIZE_OPTIONS = [
  { value: "256", label: "256 × 256 px" },
  { value: "384", label: "384 × 384 px" },
  { value: "512", label: "512 × 512 px" },
] as const

export default function GeradorQrCode() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const [text, setText] = React.useState("https://toolium.com.br")
  const [size, setSize] = React.useState<string>("384")
  const [error, setError] = React.useState<string | null>(null)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    async function render() {
      const canvas = canvasRef.current
      if (!canvas) return
      setError(null)
      if (!text.trim()) {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          canvas.width = Number(size)
          canvas.height = Number(size)
          ctx.fillStyle = "#ffffff"
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
        setReady(false)
        return
      }
      try {
        await QRCode.toCanvas(canvas, text, {
          width: Number(size),
          margin: 2,
          color: { dark: "#0f172a", light: "#ffffff" },
          errorCorrectionLevel: "M",
        })
        if (!cancelled) {
          setReady(true)
        }
      } catch {
        if (!cancelled) {
          setError("Não foi possível gerar o QR Code para esse conteúdo.")
          setReady(false)
        }
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [text, size])

  function downloadPng() {
    const canvas = canvasRef.current
    if (!canvas || !ready) return
    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = "qrcode-toolium.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Controls */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="qr-text">Conteúdo (link ou texto)</Label>
          <Textarea
            id="qr-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cole aqui um link ou digite o texto que será codificado no QR Code."
            rows={5}
            className="resize-y font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            {text.length} caractere{text.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="qr-size">Tamanho da imagem</Label>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger id="qr-size" className="w-full">
              <SelectValue placeholder="Selecione o tamanho" />
            </SelectTrigger>
            <SelectContent>
              {SIZE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={downloadPng}
          disabled={!ready}
          className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
        >
          <Download className="size-4" />
          Baixar PNG
        </Button>

        {error && (
          <p className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            {error}
          </p>
        )}
      </div>

      {/* Preview */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex aspect-square w-full max-w-[320px] items-center justify-center rounded-xl border bg-white p-4 shadow-sm">
          <canvas
            ref={canvasRef}
            className="h-full w-full max-w-full object-contain"
            aria-label="Pré-visualização do QR Code gerado"
            role="img"
          />
        </div>
        {!ready && !error && (
          <p className="text-center text-xs text-muted-foreground">
            {text.trim()
              ? "Gerando QR Code..."
              : "Digite um conteúdo para gerar o QR Code."}
          </p>
        )}
      </div>
    </div>
  )
}
